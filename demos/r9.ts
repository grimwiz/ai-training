import { DemoDefinition } from "./types";

export const r9Demo: DemoDefinition = {
  headline: "Missing facts invite guessing",
  setup: "The question asks for a due date, but the text never gives one. Some assistants still produce a date.",
  input: "Question: When is the application due?\nGiven text: Applications open in May. Decisions are announced in July.",
  controls: [{ type: "toggle", id: "mode", label: "Answering style", options: ["Let it guess", "Require evidence / say 'I don't know'"], defaultValue: "Let it guess" }],
  outputPanels: {
    "Let it guess": {
      bad: "Typical bad result: 'The application is due on June 15.'",
      better: "Better result: 'The text does not state a due date. I can list what is known and what is missing.'"
    },
    "Require evidence / say 'I don't know'": {
      bad: "Typical bad result: 'Likely around mid-June.'",
      better: "Better result: 'Unknown from this source. Please share the deadline section or a link so I can quote it.'"
    }
  },
  teachingPoints: [
    "Ask for supported vs inferred vs unknown.",
    "Require quotes for factual claims.",
    "Treat confident answers without evidence as suspect."
  ]
};
