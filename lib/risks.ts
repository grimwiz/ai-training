import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";

export type RiskRecord = {
  ID: string;
  Title: string;
  What_happens: string;
  Why_it_happens: string;
  Training_vignette: string;
  Test_prompt: string;
  Mitigation_checklist: string;
  Source_URLs: string;
};

export const homeOrderingTitles = [
  "Misparsing inputs",
  "Hallucinations",
  "Retrieval failure / wrong-context selection",
  "Overconfidence / miscalibration",
  "Semantic ablation",
  "Lossy context compression",
  "Human–LLM intent mismatch",
  "Bias / framing defaults",
  "Sycophancy"
] as const;

const categoryByTitlePrefix: Record<string, "Documents" | "Accuracy" | "Prompting" | "Long chats"> = {
  "Misparsing inputs": "Documents",
  "Hallucinations": "Accuracy",
  "Retrieval failure / wrong-context selection": "Accuracy",
  "Overconfidence / miscalibration": "Accuracy",
  "Semantic ablation": "Prompting",
  "Lossy context compression": "Long chats",
  "Human–LLM intent mismatch": "Prompting",
  "Bias / framing defaults": "Prompting",
  "Sycophancy": "Prompting"
};

const specialAdvancedOrder = [
  "Conversation portability & backup failure",
  "Vendor continuity risk",
  "Prompt injection"
];

function startsWithTitle(title: string, prefix: string): boolean {
  return title.toLowerCase().startsWith(prefix.toLowerCase());
}

function simplify(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function firstSentence(text: string): string {
  const cleaned = simplify(text);
  const sentence = cleaned.split(/(?<=[.!?])\s+/)[0] ?? cleaned;
  return sentence.length > 150 ? `${sentence.slice(0, 147)}...` : sentence;
}

export function splitChecklist(text: string): string[] {
  return text
    .split(/\n|;|•|\u2022|\-|\d+\.|\|/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

export function splitSources(text: string): string[] {
  return text
    .split(/\s*[;,\n]\s*/)
    .map((item) => item.trim())
    .filter((item) => item.startsWith("http"));
}

export type RiskView = {
  id: string;
  title: string;
  whatHappensSimple: string;
  whyBullets: string[];
  checklist: string[];
  sources: string[];
  summary: string;
  category: "Documents" | "Accuracy" | "Prompting" | "Long chats";
  isPrimary: boolean;
};

export function getRisks(): RiskView[] {
  const csvPath = path.join(process.cwd(), "llm_risk_taxonomy.csv");
  const content = fs.readFileSync(csvPath, "utf-8");
  const parsed = Papa.parse<RiskRecord>(content, { header: true, skipEmptyLines: true });

  const rows = parsed.data.map((row) => {
    const titleKey = homeOrderingTitles.find((prefix) => startsWithTitle(row.Title, prefix));
    return {
      id: row.ID,
      title: row.Title,
      whatHappensSimple: firstSentence(row.What_happens),
      whyBullets: splitChecklist(row.Why_it_happens).slice(0, 4),
      checklist: splitChecklist(row.Mitigation_checklist),
      sources: splitSources(row.Source_URLs),
      summary: firstSentence(row.What_happens),
      category: titleKey ? categoryByTitlePrefix[titleKey] : "Accuracy",
      isPrimary: Boolean(titleKey)
    } satisfies RiskView;
  });

  const primary = homeOrderingTitles
    .map((prefix) => rows.find((r) => startsWithTitle(r.title, prefix)))
    .filter((r): r is RiskView => Boolean(r));

  const advancedByPriority = specialAdvancedOrder
    .map((prefix) => rows.find((r) => startsWithTitle(r.title, prefix)))
    .filter((r): r is RiskView => Boolean(r));

  const included = new Set([...primary, ...advancedByPriority].map((r) => r.id));
  const rest = rows.filter((r) => !included.has(r.id));

  return [...primary, ...advancedByPriority, ...rest];
}

export function getPrimaryRisks(): RiskView[] {
  return getRisks().filter((r) => r.isPrimary);
}

export function getAdvancedRisks(): RiskView[] {
  return getRisks().filter((r) => !r.isPrimary);
}

export function getRiskById(id: string): RiskView | undefined {
  return getRisks().find((r) => r.id === id);
}
