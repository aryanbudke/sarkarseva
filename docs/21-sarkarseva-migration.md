# 21 · Migrating SarkarSeva into this repo

SarkarSeva (built earlier in Google AI Studio: Vite + React 19 + Express + Gemini, live at sarkarseva.vercel.app) is the **donor**, not the base. We keep its content, translations and look, and we replace its matching, its chatbot and its structure with the architecture in docs 02–20.

## Audit summary

| Area | What SarkarSeva has | Verdict | Why |
| --- | --- | --- | --- |
| Scheme matching (`SchemeFinder.tsx`) | Score starts at 65, adds/subtracts points, clamps to 15–98 % "match" | **Replace** with `packages/engine` | A scheme you are *not* eligible for still shows ~40–60 % "match". No unknowns, no reasons, nothing to verify. A judge asking "how is 87 % computed?" sinks it. |
| Scheme data (`data.ts` `SCHEMES`, 15 schemes) | Free-text eligibility, min/max age, income cap, no source URLs | **Use as a research list only** | Several entries look wrong or outdated (see `migration/scheme-candidates.csv` notes). Example: NSAP min age 60 would exclude our 58-year-old widow persona. |
| AI chat (`api/index.ts`, `ChatDrawer.tsx`) | Plain Gemini, temperature 0.7, no grounding, no citations | **Keep the drawer UI, replace the backend** with `/v1/ask` (doc 20) | As-is, it *is* "just ChatGPT". |
| Offline fallback text in `api/index.ts` | Hard-coded facts ("Aadhaar updates take 3-5 days for ₹50") | **Delete** | Unsourced facts shown to citizens. |
| "My Sewa Center" / Track Applications (`App.tsx`) | Hard-coded applications with realistic reference numbers | **Delete** | Looks like real records but is invented; also contradicts "no login, nothing stored". |
| Service guides (`services_data.ts`, 19 services) | Steps, documents, fees, FAQs for Aadhaar, PAN, certificates, e-Shram… | **Reuse** certificate/ID guides as "How to get this document" content | Directly answers "where do I get the missing document?". Drop DL, passport, GST from the demo — out of the problem statement's scope. |
| Document checker (`DocumentChecker.tsx`) | Checklist, file upload UI, download checklist | **Reuse the checklist UX**, drop file upload | Uploading documents breaks the privacy promise and isn't needed. |
| UI translations (`TRANSLATIONS`, 8 languages incl. Kannada) | Landing-page strings | **Reuse** en/kn/hi as a starting point for i18n review | Saves the data track hours. Strings are landing-page specific, so only nav/buttons/disclaimer carry over directly. |
| Visual style (`index.css`) | Warm off-white `#FAF9F5`, Fraunces + DM Sans, saffron `#FF6B00` + green `#138808` | **Reuse as the base look** (calm light theme, doc 05 update) | Already close to the calm direction. Use saffron as an accent, not on everything. |
| Gemini integration | `@google/genai`, key in env | **Reuse** as the first LLM provider behind `providers/llm` | Team already has a key and knows it. |
| Structure | 300–700-line components, no feature folders, no tests, Express + Vite in one server | **Replace** with the monorepo (BE-01) | Can't be built in parallel by 3–6 people or tested. |
| Deployment | Vercel | **Keep** for the web app | API moves to Railway/Render (doc 18). |

Live site: keep sarkarseva.vercel.app online until the new app is deployed, then point the domain (or the README link) to the new build.

## Name

Decide once, today: **SarkarSeva** (already live, team knows it) or **Yojana Saathi** (used in the deck and specs). If you keep SarkarSeva, find-and-replace the product name in README, docs, deck and i18n strings in one commit. Don't ship with two names.

## Old → new mapping

| SarkarSeva file | Goes to | How |
| --- | --- | --- |
| `src/data.ts` → `TRANSLATIONS` | `apps/web/src/shared/i18n/common/{en,kn,hi}.json` | Copy reusable keys (nav, buttons, disclaimer, badges) from `migration/legacy-ui-strings.json`; data track reviews |
| `src/data.ts` → `SCHEMES` | `packages/schemes/data/**` (new JSON, doc 17) | Research list only: `migration/scheme-candidates.csv` |
| `src/services_data.ts` (certificates, Aadhaar, e-Shram…) | `packages/schemes/documents.json` `howToGet` | Draft in `migration/documents.draft.json`, every entry `verify: true` until checked |
| `src/components/ChatDrawer.tsx` | `apps/web/src/features/scheme-qa/components/` | Port UI only; wire to `/v1/ask`; add citations + refusal states |
| `src/components/DocumentChecker.tsx` | `apps/web/src/features/documents/components/` | Port checklist + "download checklist"; remove file upload |
| `src/components/SchemeFinder.tsx` | — | Don't port the logic. Its stepper UI can inspire the QuestionCard; that's all |
| `src/components/Navbar.tsx`, `Footer.tsx`, `LandingHero.tsx` | `app/AppShell.tsx`, onboarding | Reuse language switcher and disclaimer text; drop the marketing hero (the app opens on Home with the mic) |
| `src/index.css` theme | `apps/web/src/shared/ui/tokens.css` | Keep background, fonts, saffron accent; add status colours from doc 05 |
| `api/index.ts` Gemini client | `apps/api/src/providers/llm/gemini.ts` | Keep the client setup; temperature 0; structured JSON output; no hard-coded fallback text |
| `ServiceGuide.tsx`, `ServicesDirectory.tsx`, `SearchResults.tsx` | P2 / not ported | Out of scope for the hackathon demo |

## Order

Migration runs inside the normal tasks, not as a separate project:

1. **MIG-01 (data, now):** verify the 15 candidate schemes and 9 document guides; drop the wrong ones.
2. **MIG-02 (frontend, with FE-02/FE-03):** port tokens, fonts and i18n strings.
3. **MIG-03 (backend, with BE-08):** Gemini provider adapter.
4. **MIG-04 (frontend, with FE-09):** port DocumentChecker checklist UI.
5. **MIG-05 (frontend, with FE-17):** port ChatDrawer UI onto `/v1/ask`.
6. **MIG-06 (lead, after G4):** retire the old app: final screenshots for the "before vs after" slide, then archive the old repo.

Prompts: `tasks/migration.md`.

## "Before vs after" — use it in the pitch

SarkarSeva's percentage score is a good story *against* yourselves: "Our first version said 65 % match for schemes you can't get. We rebuilt it so every answer is yes, no, or 'we need one more fact' — with the rule and the source." Judges respect teams that show what they fixed.
