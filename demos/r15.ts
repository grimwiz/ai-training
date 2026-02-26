import { DemoDefinition } from "./types";

export const r15Demo: DemoDefinition = {
  headline: "Dropping NOT or units changes meaning",
  setup: "A tiny wording loss can become dangerous. Here we compare the original instruction with one that lost a negation or a unit.",
  input: "Original: Do NOT exceed 5 mg daily.\nAltered: Do exceed 5 daily.",
  controls: [{ type: "toggle", id: "mode", label: "Instruction integrity", options: ["Negation/unit dropped", "All constraints preserved"], defaultValue: "Negation/unit dropped" }],
  outputPanels: {
    "Negation/unit dropped": {
      bad: "Typical bad result: 'Take more than 5 each day.'",
      better: "Better result: 'Possible missing constraint detected. Original says NOT exceed 5 mg daily.'"
    },
    "All constraints preserved": {
      bad: "Typical bad result: 'Take 5 whenever.'",
      better: "Better result: 'Requirement block: max dose 5 mg per day. Repeat units in final answer.'"
    }
  },
  teachingPoints: [
    "Use a requirements block with negations and units listed clearly.",
    "Ask for a compliance checklist before final output.",
    "Repeat critical units and limits in the final answer."
  ]
};
