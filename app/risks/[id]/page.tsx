import Link from "next/link";
import { notFound } from "next/navigation";
import { RiskDemo } from "@/components/RiskDemo";
import { demosByRiskId } from "@/demos";
import { getPrimaryRisks, getRiskById } from "@/lib/risks";

export default function RiskDetailPage({ params }: { params: { id: string } }) {
  const risk = getRiskById(params.id);
  if (!risk) return notFound();

  const demo = demosByRiskId[risk.id];
  const homeFlow = getPrimaryRisks();
  const idx = homeFlow.findIndex((r) => r.id === risk.id);
  const prev = idx > 0 ? homeFlow[idx - 1] : undefined;
  const next = idx >= 0 && idx < homeFlow.length - 1 ? homeFlow[idx + 1] : undefined;

  return (
    <main className="space-y-6">
      <Link href="/risks">← Back to risks</Link>
      <h1 className="text-3xl font-bold">{risk.title}</h1>

      <section>
        <h2 className="text-xl font-semibold">What happens</h2>
        <p className="text-slate-700">{risk.whatHappensSimple}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Why it happens</h2>
        <ul className="list-disc pl-5 text-slate-700">
          {risk.whyBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Try it</h2>
        {demo ? (
          <RiskDemo demo={demo} />
        ) : (
          <div className="rounded border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <p>Walkthrough: copy a short source passage, ask for an answer with direct quotes, then compare with a no-quote prompt.</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to avoid it</h2>
        <ul className="list-disc pl-5 text-slate-700">
          {risk.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Sources</h2>
        <ul className="list-disc pl-5 text-slate-700">
          {risk.sources.length > 0 ? (
            risk.sources.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
              </li>
            ))
          ) : (
            <li>No source URL listed in the CSV for this item.</li>
          )}
        </ul>
      </section>

      {(prev || next) && (
        <nav className="flex justify-between border-t border-slate-200 pt-4">
          <div>{prev ? <Link href={`/risks/${prev.id}`}>← {prev.title}</Link> : <span />}</div>
          <div>{next ? <Link href={`/risks/${next.id}`}>{next.title} →</Link> : <span />}</div>
        </nav>
      )}
    </main>
  );
}
