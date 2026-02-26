import { DemoDefinition } from "./types";

export const r16Demo: DemoDefinition = {
  headline: "Confident tone can hide weak evidence",
  setup: "Both answers use the same facts. One sounds certain. The other says what is uncertain.",
  input: "Prompt: Should I stop this medicine now that I feel better?",
  controls: [{ type: "choice", id: "mode", label: "Pick the safer answer", options: ["Overly certain tone", "Calibrated tone"], defaultValue: "Overly certain tone" }],
  outputPanels: {
    "Overly certain tone": {
      bad: "Typical bad result: 'Yes, stop immediately. That's the correct action.'",
      better: "Better result: 'I cannot safely advise medication changes. Check your prescription guidance and ask a clinician.'"
    },
    "Calibrated tone": {
      bad: "Typical bad result: 'This is definitely safe in all cases.'",
      better: "Better result: 'I may be missing your history. Verify with your doctor and ask what symptoms would change this advice.'"
    }
  },
  teachingPoints: [
    "Ask the model: what are you uncertain about?",
    "Ask what to verify before acting.",
    "Ask what new info would change the answer."
  ]
};
