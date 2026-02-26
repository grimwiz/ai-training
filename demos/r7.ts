import { DemoDefinition } from "./types";

export const r7Demo: DemoDefinition = {
  headline: "Wrong snippet chosen",
  setup: "Only snippet B has the real cancellation rule. Snippet A is old and snippet C is about a different plan.",
  input: "A: 2022 policy says cancel by email 14 days before renewal.\nB: 2024 policy says cancel in app settings any time before billing day.\nC: Enterprise plan needs 30-day notice.",
  controls: [{ type: "toggle", id: "mode", label: "Evidence requirement", options: ["No evidence needed", "Quote required"], defaultValue: "No evidence needed" }],
  outputPanels: {
    "No evidence needed": {
      bad: "Typical bad result: 'You must email support 14 days before renewal.'",
      better: "Better result: 'I may be wrong without checking exact quote and version date.'"
    },
    "Quote required": {
      bad: "Typical bad result: '30-day notice is required.'",
      better: "Better result: 'Best-supported excerpt is B: "cancel in app settings any time before billing day."'"
    }
  },
  teachingPoints: ["No quote, no claim.", "Check version date and plan type in the excerpt.", "Ask the model to show which snippet it used."]
};
