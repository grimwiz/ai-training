import { DemoDefinition } from "./types";

export const r17Demo: DemoDefinition = {
  headline: "Two-column PDF gets read in the wrong order",
  setup: "This fake policy has two columns. Left says refunds are allowed in 30 days. Right says gift cards are excluded. Linear extraction mixes lines and flips the meaning.",
  input: "[LEFT] Refunds are allowed within 30 days with receipt.\n[RIGHT] Gift cards are not refundable.\n[LEFT] Opened electronics need manager approval.\n[RIGHT] Final sale items are never refunded.",
  controls: [{ type: "toggle", id: "mode", label: "Extraction mode", options: ["Naïve extraction", "Column-aware extraction"], defaultValue: "Naïve extraction" }],
  outputPanels: {
    "Naïve extraction": {
      bad: "Typical bad result: 'All items may be refunded within 30 days if you have a receipt.'",
      better: "Better result: 'I might be reading mixed columns. I see exclusions: gift cards and final-sale items are not refundable.'"
    },
    "Column-aware extraction": {
      bad: "Typical bad result: 'Refund policy is simple and universal.'",
      better: "Better result: 'Column-aware read shows exceptions. Quote: \"Gift cards are not refundable\" and \"Final sale items are never refunded.\"'"
    }
  },
  teachingPoints: [
    "Ask the model to describe document layout first.",
    "Ask it to quote exact clauses before summarizing.",
    "Provide a screenshot/snippet for tricky tables and columns."
  ]
};
