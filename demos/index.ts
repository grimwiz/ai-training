import { DemoDefinition } from "./types";
import { r14Demo } from "./r14";
import { r15Demo } from "./r15";
import { r16Demo } from "./r16";
import { r17Demo } from "./r17";
import { r7Demo } from "./r7";
import { r9Demo } from "./r9";

export const demosByRiskId: Record<string, DemoDefinition> = {
  R17: r17Demo,
  R9: r9Demo,
  R7: r7Demo,
  R16: r16Demo,
  R15: r15Demo,
  R14: r14Demo
};
