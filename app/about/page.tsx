import Link from "next/link";
import { getRisks } from "@/lib/risks";

export default function AboutPage() {
  const risks = getRisks();

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">About this site</h1>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">How to use this site</h2>
        <ol className="list-decimal space-y-1 pl-6 text-slate-700">
          <li>Open the Risks page and pick one issue that matches your task.</li>
          <li>Try the scripted demo to see a common failure and a safer pattern.</li>
          <li>Copy the “How to avoid it” checklist into your real prompt.</li>
        </ol>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Sources</h2>
        <p className="text-slate-700">This site reads from llm_risk_taxonomy.csv in this repository.</p>
        <ul className="list-disc pl-6 text-sm text-slate-700">
          {risks.flatMap((r) => r.sources).map((url) => (
            <li key={url}>{url}</li>
          ))}
        </ul>
      </section>

      <Link href="/risks">Go to risks →</Link>
    </main>
  );
}
