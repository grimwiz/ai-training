"use client";

import { useMemo, useState } from "react";
import { RiskView } from "@/lib/risks";
import { RiskCard } from "./RiskCard";

const filters = ["All", "Documents", "Accuracy", "Prompting", "Long chats"] as const;

export function RisksIndexClient({ primary, advanced }: { primary: RiskView[]; advanced: RiskView[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const matches = (risk: RiskView) => {
    const q = query.trim().toLowerCase();
    const textHit = !q || risk.title.toLowerCase().includes(q) || risk.summary.toLowerCase().includes(q);
    const filterHit = filter === "All" || risk.category === filter;
    return textHit && filterHit;
  };

  const primaryFiltered = useMemo(() => primary.filter(matches), [primary, query, filter]);
  const advancedFiltered = useMemo(() => advanced.filter(matches), [advanced, query, filter]);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <label className="block text-sm font-medium">Search risks</label>
        <input
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Search by title or summary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setFilter(option)}
              className={`rounded px-3 py-1 text-sm ${filter === option ? "bg-blue-700 text-white" : "bg-slate-100"}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {primaryFiltered.map((risk) => (
          <RiskCard key={risk.id} risk={risk} />
        ))}
      </div>

      <details className="rounded-lg border border-slate-200 bg-white p-4">
        <summary className="cursor-pointer font-semibold">Advanced / less common at home</summary>
        <div className="mt-3 grid gap-3">
          {advancedFiltered.map((risk) => (
            <RiskCard key={risk.id} risk={risk} />
          ))}
        </div>
      </details>
    </div>
  );
}
