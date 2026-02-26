"use client";

import { useMemo, useState } from "react";
import { DemoDefinition } from "@/demos/types";

export function RiskDemo({ demo }: { demo: DemoDefinition }) {
  const [input, setInput] = useState(demo.input);
  const firstControl = demo.controls[0];
  const [mode, setMode] = useState(firstControl?.defaultValue ?? "");

  const panel = useMemo(() => demo.outputPanels[mode], [demo.outputPanels, mode]);

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="text-lg font-semibold">{demo.headline}</h3>
      <p className="text-sm text-slate-700">{demo.setup}</p>

      <label className="block text-sm font-medium">Demo input</label>
      <textarea
        className="min-h-32 w-full rounded border border-slate-300 p-2 text-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {firstControl && (
        <div>
          <p className="text-sm font-medium">{firstControl.label}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {firstControl.options.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => setMode(option)}
                className={`rounded px-3 py-1 text-sm ${mode === option ? "bg-blue-700 text-white" : "bg-slate-100"}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {panel && (
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded border border-rose-200 bg-rose-50 p-3 text-sm">
            <p className="font-semibold">Typical bad result</p>
            <p>{panel.bad}</p>
          </div>
          <div className="rounded border border-emerald-200 bg-emerald-50 p-3 text-sm">
            <p className="font-semibold">Better result</p>
            <p>{panel.better}</p>
          </div>
        </div>
      )}

      <div>
        <p className="text-sm font-semibold">What to do next</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {demo.teachingPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
