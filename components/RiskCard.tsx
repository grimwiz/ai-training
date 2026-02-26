import Link from "next/link";
import { RiskView } from "@/lib/risks";

export function RiskCard({ risk }: { risk: RiskView }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="text-lg font-semibold">
        <Link href={`/risks/${risk.id}`}>{risk.title}</Link>
      </h3>
      <p className="mt-2 text-sm text-slate-700">{risk.summary}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="rounded bg-slate-100 px-2 py-1 text-xs">{risk.category}</span>
        <Link href={`/risks/${risk.id}`} className="rounded bg-blue-700 px-3 py-1 text-sm text-white no-underline">
          Try demo
        </Link>
      </div>
    </article>
  );
}
