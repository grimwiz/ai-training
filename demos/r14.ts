import { DemoDefinition } from "./types";

export const r14Demo: DemoDefinition = {
  headline: "Long chats can drift from original rules",
  setup: "The thread starts with a pinned rule: 'Never include personal addresses.' Later summaries forget it unless the rule is pinned.",
  input: "Pinned rule: Never include personal addresses in shared notes.\nLater summary: Include full contact details for convenience.",
  controls: [{ type: "toggle", id: "mode", label: "Conversation setup", options: ["No pinned spec", "Pinned spec"], defaultValue: "No pinned spec" }],
  outputPanels: {
    "No pinned spec": {
      bad: "Typical bad result: 'Sure, I added names, phones, and home addresses.'",
      better: "Better result: 'I may have drifted from earlier constraints in this long thread.'"
    },
    "Pinned spec": {
      bad: "Typical bad result: 'I included everything from later messages.'",
      better: "Better result: 'I kept the pinned rule and removed personal addresses from the final notes.'"
    }
  },
  teachingPoints: [
    "Keep a short source-of-truth at the top.",
    "Restate constraints before long outputs.",
    "Refresh the model with the pinned spec after many turns."
  ]
};
