# Migration tasks — SarkarSeva → new repo

Plan and audit: `docs/21-sarkarseva-migration.md`. Extracted data: `migration/` (committed to the repo).
Put the old project in `legacy/sarkarseva/` (read-only reference; never imported by new code; delete before submission).

Every prompt starts with the AGENTS.md line. Keep it.

---

## MIG-00 · Bring in the legacy code — Lead · 10 min · now

```bash
# from the repo root
mkdir -p legacy && unzip sarkarseva-main.zip -d legacy/ && mv legacy/sarkarseva-main legacy/sarkarseva && rm -rf legacy/__MACOSX
```
Add `legacy/**` to the `ignores` list in `eslint.config.js`, the TypeScript `exclude`, and the Vitest `exclude`. Make sure `pnpm-workspace.yaml` does not match `legacy/` (it only lists `apps/*` and `packages/*`). Commit: `chore: add SarkarSeva as read-only legacy reference`.

---

## MIG-01 · Verify legacy scheme + document data — Data · P0 · start now (no code)

- [ ] Open `migration/scheme-candidates.csv`. For each row: find the official page, fill `official_source_url`, set `status` to `keep` / `drop` / `split`, and add the new scheme id. Read the `notes` column first: several rows are probably wrong.
- [ ] Split NSAP into its real component schemes (old age, widow, disability) with their own rules.
- [ ] Open `migration/documents.draft.json`. For each document, check `howToGet` against the official portal for **Karnataka**. Rewrite it in plain words, fill `kn` and `hi`, and set `verify: false` only for what you confirmed.
- [ ] Kept schemes go through the normal pipeline (doc 17): criteria sheet → JSON → `pnpm schemes:check`.

---

## MIG-02 · Port look + strings — Frontend · P0 · with FE-02 / FE-03

**Prompt**
```
Read AGENTS.md, docs/05-design-system.md and docs/21-sarkarseva-migration.md.
Legacy reference (read only): legacy/sarkarseva/src/index.css and migration/legacy-ui-strings.json.

1. In apps/web/src/shared/ui/tokens.css, base the light theme on the legacy look: background #FAF9F5, Fraunces for headings and DM Sans for body (self-host via @fontsource so it works offline; Noto Sans Kannada and Noto Sans Devanagari as fallbacks). Use saffron #FF6B00 only as an accent. Keep the status colours, contrast and touch-target rules from docs/05.
2. Copy only the reusable keys (nav labels, buttons, badges, footer disclaimer) from migration/legacy-ui-strings.json into apps/web/src/shared/i18n/common/{en,kn,hi}.json with our key naming (docs/03). Skip landing-page marketing strings.
3. Update docs/05 to record the new base palette and fonts.
Do not import anything from legacy/. Show me /dev/ui in light theme when done.
```

---

## MIG-03 · Gemini as the LLM provider — Backend · P0 · with BE-08

**Prompt**
```
Read AGENTS.md, docs/09-ai-layer-and-prompts.md and apps/api/SPEC.md.
Legacy reference (read only): legacy/sarkarseva/api/index.ts (Gemini client setup).

Implement apps/api/src/providers/llm/gemini.ts implementing the LlmProvider interface from docs/09, using @google/genai. Rules:
- temperature 0, JSON/structured output with the zod schema converted to JSON Schema, 8 s timeout.
- Model name from env LLM_MODEL (don't hard-code it). Key from env LLM_API_KEY.
- No hard-coded fallback answers. On any failure, throw a typed error; routes map it to PROVIDER_FAILED / TIMEOUT.
- Never log prompts or responses.
Select it with LLM_PROVIDER=gemini. Add recorded-fixture tests (no live calls in tests).
```

---

## MIG-04 · Port the document checklist UI — Frontend · P0 · with FE-09

**Prompt**
```
Read AGENTS.md and apps/web/src/features/documents/SPEC.md.
Legacy reference (read only): legacy/sarkarseva/src/components/DocumentChecker.tsx.

Port only the checklist experience into features/documents: rows with have/missing toggles, progress, and "Download checklist" (as text or PDF of the checklist only). Do NOT port file upload, drag-and-drop or file validation — documents never leave the phone. Data comes from our documents store and documents.json, not from legacy data. Split into the components the SPEC lists; no file over ~200 lines; all strings through i18n.
```

---

## MIG-05 · Port the chat drawer onto grounded RAG — Frontend · P1 · with FE-17

**Prompt**
```
Read AGENTS.md, apps/web/src/features/scheme-qa/SPEC.md and docs/20-rag-scheme-qa.md.
Legacy reference (read only): legacy/sarkarseva/src/components/ChatDrawer.tsx.

Reuse the drawer layout and message styling, but wire it to POST /v1/ask (not /api/ask-gemini). Add: citation markers + CitationSheet, refusal states (not_in_sources, eligibility_question → "Check if I qualify"), suggested question chips, offline state. Remove the "SevAI" general-assistant persona: this chat answers only about the scheme being viewed.
```

---

## MIG-06 · Retire the old app — Lead · after gate G4

- [ ] Screenshot the old Scheme Finder showing a % match for a scheme the persona can't get. Put it next to the new verdict screen on a "What we fixed" slide.
- [ ] Remove the `legacy/` folder from the repo before submission (keep the old GitHub repo archived).
- [ ] Update sarkarseva.vercel.app (or the README link) to the new deployment.
