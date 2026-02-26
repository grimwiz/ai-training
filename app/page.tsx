import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">LLM mistakes at home: quick guide</h1>
      <p className="max-w-3xl text-slate-700">
        This small site shows common ways AI chat tools can go wrong when you upload PDFs, paste web pages, or ask questions.
        Each risk has a short explanation and a hands-on demo you can try without any API key.
      </p>
      <div className="flex gap-3">
        <Link href="/risks" className="rounded bg-blue-700 px-4 py-2 text-white no-underline">
          View risks
        </Link>
        <Link href="/about" className="rounded border border-slate-300 px-4 py-2 no-underline">
          About this site
        </Link>
      </div>
    </main>
  );
}
