export type DemoControl =
  | { type: "toggle"; id: string; label: string; options: [string, string]; defaultValue: string }
  | { type: "choice"; id: string; label: string; options: string[]; defaultValue: string };

export type DemoDefinition = {
  headline: string;
  setup: string;
  input: string;
  controls: DemoControl[];
  outputPanels: Record<string, { bad: string; better: string }>;
  teachingPoints: string[];
};
