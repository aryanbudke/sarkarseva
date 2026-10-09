# SarkarSeva — Technical Report and Jury Guide

## 1. Executive summary

SarkarSeva is a working multilingual civic-assistance platform that helps an Indian citizen discover government services, pre-screen welfare-scheme eligibility, prepare documents, follow application steps, and ask an AI assistant for plain-language guidance. The product combines a curated local knowledge base with an explainable rule engine; Gemini is used for conversational guidance, not for deciding eligibility.

> Important: match scores are pre-screening guidance. The relevant government authority makes the final eligibility decision.

## 2. Expected-outcome coverage

| Expected outcome | Implementation | Jury evidence |
|---|---|---|
| Working AI government-scheme matching platform | Five-step citizen profile, live ranking, details modal, Gemini assistant | Open **Scheme Finder**, change income/occupation, then open **Quick Check** |
| Scheme and eligibility knowledge base | 15 central-scheme records plus 19 service guides, eligibility rules, benefits, documents, official links | `src/data.ts`, `src/services_data.ts`, `src/scheme_guidance.ts` |
| Personalized scheme matching module | Deterministic weighted rules for age, gender, income, occupation, sector and category | `src/lib/schemeMatcher.ts` |
| Application guidance interface | Per-scheme documents, numbered application steps and official-portal redirects; service guides and document checker | Scheme **Quick Check** and any **Service Guide** |
| Matching accuracy and user-guidance analysis | Explainable pass/fail criteria, evidence confidence, mandatory-rule hard-fail cap, repeatable five-persona benchmark | `npm run test:matcher` and the analysis below |
| Final technical report and demonstration | This report, architecture diagrams and a timed demo script | `docs/TECHNICAL_REPORT.md` |

## 3. Application flow

```mermaid
flowchart TD
    A[Citizen opens SarkarSeva] --> B{Choose a task}
    B --> C[Search government service]
    B --> D[Find eligible schemes]
    B --> E[Check required documents]
    B --> F[Ask AI assistant]

    C --> C1[Filter 19 service records]
    C1 --> C2[Open service guide]
    C2 --> C3[Read steps, fees, timeline and FAQs]
    C3 --> E
    C3 --> C4[Continue to official portal]

    D --> D1[Enter age and gender]
    D1 --> D2[Choose state and urban/rural sector]
    D2 --> D3[Choose benefit category]
    D3 --> D4[Enter family income]
    D4 --> D5[Choose occupation]
    D5 --> D6[Explainable matcher ranks 15 schemes]
    D6 --> D7[Review passed, failed and verify criteria]
    D7 --> D8[Prepare documents and follow steps]
    D8 --> D9[Continue to official scheme portal]

    E --> E1[Select service]
    E1 --> E2[Upload or tick document readiness]
    E2 --> E3[Download or print checklist]

    F --> F1[Express API receives prompt and history]
    F1 --> F2{Gemini key configured?}
    F2 -->|Yes| F3[Gemini returns civic guidance]
    F2 -->|No| F4[Offline fallback explains available tools]
```

## 4. System architecture

```mermaid
flowchart LR
    subgraph Client[React 19 + TypeScript client]
      UI[Navigation and responsive UI]
      SF[Scheme Finder]
      ME[Explainable matching engine]
      KB[(Local scheme and service knowledge base)]
      SG[Service and application guides]
      DC[Document checker]
      CHAT[AI chat drawer]
    end

    subgraph Server[Node / Express API]
      HEALTH[GET /api/health]
      ASK[POST /api/ask-gemini]
      FALLBACK[Offline fallback]
    end

    subgraph External[External systems]
      GEMINI[Google Gemini API]
      GOV[Official government portals]
    end

    UI --> SF
    UI --> SG
    UI --> DC
    UI --> CHAT
    SF --> ME
    ME --> KB
    SG --> KB
    DC --> KB
    CHAT --> ASK
    ASK -->|API key present| GEMINI
    ASK -->|API key absent/error| FALLBACK
    SF --> GOV
    SG --> GOV

    VERCEL[Vercel deployment] -. hosts .-> Client
    VERCEL -. serverless route .-> Server
```

## 5. Matching-engine flow

```mermaid
flowchart TD
    P[Citizen profile] --> R[Evaluate every scheme]
    R --> C1[Category preference: 10]
    R --> C2[Gender: 20]
    R --> C3[Age range: 20]
    R --> C4[Income cap: 25]
    R --> C5[Occupation: 25]
    R --> C6[Urban/rural coverage: 15]
    C1 --> S[Normalize earned / applicable weight]
    C2 --> S
    C3 --> S
    C4 --> S
    C5 --> S
    C6 --> S
    S --> H{Mandatory mismatch?}
    H -->|Yes| CAP[Cap score at 49: not likely eligible]
    H -->|No| KEEP[Keep normalized score]
    CAP --> SORT[Sort descending]
    KEEP --> SORT
    SORT --> X[Show score, confidence and criterion explanations]
    X --> O[Citizen verifies on official portal]
```

### Why this is explainable

- Only rules applicable to a scheme enter its denominator.
- Category is treated as a preference; age, gender, income, occupation and sector are eligibility evidence.
- Any failed mandatory criterion caps the result below the 75% “High Match” threshold.
- The UI shows exactly which rules passed, failed, or still require official verification.
- Location is marked **verify** because central schemes can have state-specific implementation details.

## 6. AI request sequence

```mermaid
sequenceDiagram
    actor Citizen
    participant UI as Chat Drawer
    participant API as Express / Vercel API
    participant AI as Gemini

    Citizen->>UI: Ask civic question
    UI->>API: POST prompt + conversation history
    API->>API: Validate prompt and API-key state
    alt Gemini configured
      API->>AI: System instruction + history + prompt
      AI-->>API: Markdown guidance
      API-->>UI: text, isDummy=false
    else Key absent or provider error
      API-->>UI: Safe local fallback, isDummy=true
    end
    UI-->>Citizen: Render structured answer
```

## 7. Matching analysis and validation

The included benchmark uses five representative personas: a low-income student, rural farmer, urban street vendor, low-income senior citizen, and woman seeking LPG support. Each scenario declares an expected scheme that must appear in the top three.

Run:

```bash
npm run test:matcher
```

This is a deterministic regression benchmark, not a claim of real-world approval accuracy. A production evaluation should add anonymised labelled cases reviewed by domain experts and report precision@k, recall@k, false-positive rate and subgroup performance.

## 8. Data and privacy design

- Profile answers remain in React state; this version does not persist or transmit them.
- Uploaded documents are validated in-browser and represented only by file metadata; files are not sent to a server.
- Gemini receives only the user’s chat prompt and chat history.
- The Gemini API key remains server-side.
- Official applications occur on government portals, not inside SarkarSeva.

## 9. Deployment flow

```mermaid
flowchart LR
    DEV[Developer] -->|push main| GH[GitHub repository]
    GH -->|automatic build| VC[Vercel]
    VC --> VITE[Vite production bundle]
    VC --> FN[Express serverless API]
    ENV[GEMINI_API_KEY secret] --> FN
    VITE --> USER[Citizen browser]
    USER --> FN
```

## 10. Three-minute jury demonstration

1. **0:00–0:25 — Problem and promise:** “Government information is fragmented and difficult to interpret. SarkarSeva turns discovery, eligibility pre-screening and application preparation into one guided journey.”
2. **0:25–1:20 — Personalized matching:** Open **Scheme Finder**. Use a 35-year-old rural farmer profile with Agriculture selected. Show how results update, open PM-KISAN **Quick Check**, and point to rule explanations and confidence.
3. **1:20–1:55 — Application guidance:** In the same modal, show benefits, required documents, numbered steps and the official portal redirect.
4. **1:55–2:25 — Service workflow:** Search for Passport, open the guide, then the Document Checker. Tick/upload an item and download the readiness checklist.
5. **2:25–2:45 — AI:** Ask, “What documents do I need before a fresh passport application?” Show structured markdown guidance and explain the offline fallback.
6. **2:45–3:00 — Technical proof:** Show the architecture diagram and run `npm run test:matcher`; close with the privacy boundary and official-verification disclaimer.

## 11. Known limitations and next steps

- Scheme rules and deadlines change; introduce scheduled content review with source timestamps.
- Add state-specific schemes and jurisdiction rules.
- Validate the matcher against a larger expert-labelled dataset before claiming measured field accuracy.
- Add authentication and encrypted persistence only when application tracking becomes real rather than demonstrative.
- Add accessibility and multilingual content QA with native speakers.
