# LLM Risk Guide for Home Users

A small static Next.js site that teaches common LLM failure modes in everyday home use.

## What is included

- Home page (`/`) with intro and navigation.
- Risks index (`/risks`) with search/filter and a home-user-first ordering.
- Detail pages (`/risks/[id]`) with plain-language explanation, checklist, sources, and demo.
- About page (`/about`) with usage steps and source information.
- Scripted, no-API demos for the top 6 home risks in `demos/`.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- PapaParse for CSV parsing at build/runtime on the server side
- No backend, no database, no external LLM calls

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Available scripts

- `npm run dev`: Start local development server.
- `npm run build`: Build production output.
- `npm run start`: Start production server from a built app.
- `npm run lint`: Run Next.js lint command.

## Update `llm_risk_taxonomy.csv`

1. Replace or edit `llm_risk_taxonomy.csv` in the repo root.
2. Keep these headers intact:
   - `ID, Title, What_happens, Why_it_happens, Training_vignette, Test_prompt, Mitigation_checklist, Source_URLs`
3. Run `npm run dev` or `npm run build` to verify parsing still works.

## Add a new demo in `demos/`

1. Create `demos/<risk-id>.ts` that exports a `DemoDefinition`.
2. Include:
   - `headline`
   - `setup`
   - `input`
   - `controls`
   - `outputPanels`
   - `teachingPoints`
3. Register it in `demos/index.ts` by mapping the risk ID (for example `R21`) to your export.
4. Open `/risks/<ID>` and verify the interactive demo appears.

## Project structure

- `app/`: Routes and pages.
- `components/`: Reusable UI (`RiskCard`, `RiskDemo`, index controls).
- `lib/risks.ts`: CSV loading, ordering, and risk view model shaping.
- `demos/`: Scripted interactive demo definitions by risk ID.
- `llm_risk_taxonomy.csv`: Source data.
