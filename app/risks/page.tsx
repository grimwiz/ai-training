import { RisksIndexClient } from "@/components/RisksIndexClient";
import { getAdvancedRisks, getPrimaryRisks } from "@/lib/risks";

export default function RisksPage() {
  const primary = getPrimaryRisks();
  const advanced = getAdvancedRisks();

  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-bold">Risks index</h1>
      <p className="text-slate-700">Start with these home-relevant risks. Open any card to see details and a demo.</p>
      <RisksIndexClient primary={primary} advanced={advanced} />
    </main>
  );
}
