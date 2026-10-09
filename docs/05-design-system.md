# 05 · Design system — "Frosted Saathi"

Modern glassmorphism that stays readable for a 58-year-old in sunlight on a ₹7,000 phone. Glass is the *surface*; legibility is the *rule*.

> **Updated by MIG-02 (docs/21):** the light theme is now the calm "paper" look carried over from SarkarSeva: warm off-white, solid surfaces, no mesh, no blur, Fraunces headings and DM Sans body. Glass and the mesh remain in the dark theme. The source of truth for values is `apps/web/src/shared/ui/tokens.css`; `shared/ui/__tests__/contrast.test.ts` fails if a light-theme text colour drops below 4.5:1.

## Principles

1. **Glass frames, solid reads.** Text sits on panels opaque enough to pass contrast at the worst point of the background. Decorative glass can be thinner.
2. **One accent at a time.** The single primary action per screen gets the accent: solid saffron `#FF6B00` with dark text (`--on-accent`, 6:1) in light, the saffron-to-indigo gradient in dark. Saffron is never used for text, borders or focus in light (2.7:1 on the background); saffron-toned text uses `--accent-ink` `#A04100` (6.1:1).
3. **Status never by colour alone.** Every verdict has icon + word + colour.
4. **Big and calm.** 17 px body minimum, 48 px targets, generous spacing.
5. **Degrade gracefully.** Low-power mode and "Reduce transparency" swap glass for solid tinted surfaces with no blur and no moving blobs.

## Tokens (CSS variables, consumed by Tailwind v4 `@theme`)

### Colour — dark theme (default at night / system dark)

```css
:root[data-theme="dark"] {
  --bg-base: #070B1A;
  --mesh-1: #4F46E5;   /* indigo */
  --mesh-2: #0EA5A4;   /* teal */
  --mesh-3: #F59E0B;   /* saffron */

  --glass-thin:   rgba(255,255,255,0.06);
  --glass:        rgba(255,255,255,0.10);
  --glass-strong: rgba(15,23,42,0.62);   /* text-heavy panels */
  --glass-border: rgba(255,255,255,0.14);
  --glass-highlight: rgba(255,255,255,0.18);

  --text-1: #F8FAFC;
  --text-2: #CBD5E1;
  --text-3: #94A3B8;

  --glass-blur: 20px;

  --accent-from: #F59E0B;
  --accent-to:   #6366F1;
  --accent-ink:  #FBBF24;   /* added in MIG-02; contrast to verify in FE-02 */
  --on-accent:   #070B1A;   /* added in MIG-02; check on the indigo end of the gradient in FE-02 */
  --focus: #FDE68A;

  --ok:    #34D399;  /* Eligible */
  --maybe: #FBBF24;  /* Maybe */
  --no:    #94A3B8;  /* Not eligible */
  --info:  #60A5FA;
  --danger:#F87171;
}
```

### Colour — light theme (default; calm paper look from SarkarSeva, better outdoors)

Solid surfaces: the `--glass*` names are kept so components work in both themes, but in light they are opaque and `--glass-blur` is 0. The mesh colours equal the background, so `MeshBackground` is invisible.

```css
:root, :root[data-theme="light"] {
  --bg-base: #FAF9F5;                       /* SarkarSeva background */
  --mesh-1: #FAF9F5; --mesh-2: #FAF9F5; --mesh-3: #FAF9F5;

  --glass-thin:   #F5F4F0;                  /* sunken areas, secondary buttons */
  --glass:        #FFFFFF;                  /* cards */
  --glass-strong: #FFFFFF;                  /* sheets */
  --glass-border: #E3E2DF;
  --glass-highlight: #FFFFFF;
  --glass-blur: 0px;

  --text-1: #1B1C1A;   /* 16.2:1 on bg */
  --text-2: #47464C;   /*  8.9:1 */
  --text-3: #5B6472;   /*  5.7:1; ≥ 4.5 on every surface */

  --accent-from: #FF6B00;  --accent-to: #FF6B00;   /* fill only */
  --accent-ink:  #A04100;  /* saffron-toned text and links */
  --on-accent:   #1B1C1A;  /* text on the saffron button */
  --focus:       #1A1A2E;  /* 3 px ring, 16:1 */

  --ok: #047857; --maybe: #B45309; --no: #475569; --info: #1D4ED8; --danger: #B91C1C;
}
```

Not carried over from SarkarSeva: the India-flag green `#138808` (it would compete with the Eligible green and fails 4.5:1), white text on saffron (2.9:1), its 50-token Material palette, and Google Fonts loaded by URL (breaks offline).

### Glass recipe

```css
.glass {
  background: var(--glass);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  border: 1px solid var(--glass-border);
  box-shadow:
    inset 0 1px 0 var(--glass-highlight),
    0 8px 32px rgba(2, 6, 23, 0.28);
  border-radius: var(--radius-card);
}
/* Fallback: no backdrop-filter support, low-power, or reduce-transparency */
:root[data-glass="off"] .glass { background: var(--glass-strong); backdrop-filter: none; }
@supports not (backdrop-filter: blur(1px)) { .glass { background: var(--glass-strong); } }
```

### Background

Fixed full-screen layer: `--bg-base` plus three large blurred radial blobs (`--mesh-1..3`) drifting slowly (60–90 s loops). Add a 3 % noise texture (tiny PNG) to avoid banding. In low-power mode: static gradient, no animation. Dark theme only; in light the mesh colours equal `--bg-base`.

### Type

| Token | Size / line-height | Weight | Use |
| --- | --- | --- | --- |
| `display` | 40 / 44 | 800 | Results headline number |
| `h1` | 32 / 38 | 700 | Screen title |
| `h2` | 24 / 30 | 700 | Card title |
| `h3` | 20 / 26 | 600 | Section label |
| `body` | 17 / 26 | 400 | Default |
| `small` | 15 / 22 | 500 | Meta, chips |
| `micro` | 13 / 18 | 600 | Badges, uppercase labels |

Fonts (self-hosted via `@fontsource-variable/*`): headings `display`, `h1`, `h2` use `font-display` = `"Fraunces Variable"`; everything else uses `font-sans` = `"DM Sans Variable"`. Both stacks fall back to `"Noto Sans Kannada Variable"`, `"Noto Sans Devanagari Variable"`, then system fonts, so Kannada and Hindi always render in Noto. Tailwind's default palette and type scale are removed in `@theme`; only these tokens exist. Indic scripts need ~10 % more line-height; set `:lang(kn), :lang(hi) { line-height: 1.6 }`.

### Space, radius, elevation

- Spacing scale (px): 4, 8, 12, 16, 20, 24, 32, 40, 56.
- Radius: `--radius-chip: 999px`, `--radius-control: 16px`, `--radius-card: 24px`, `--radius-sheet: 28px`.
- Elevation = glass opacity + shadow, three levels: thin (decorative), glass (cards), strong (sheets, text-heavy panels).

### Motion

| Token | Value | Use |
| --- | --- | --- |
| `spring-snappy` | stiffness 400, damping 32 | buttons, chips |
| `spring-soft` | stiffness 220, damping 26 | cards, sheets |
| `stagger` | 40 ms | lists of cards |
| `fade` | 180 ms ease-out | overlays |

Signature moments (keep to these four):
1. **Mic pulse** — concentric rings while listening; live waveform bars.
2. **Profile chip pop** — each extracted fact flies into the profile meter.
3. **Verdict reveal** — result cards flip in, staggered, badge draws its icon.
4. **Unlock meter fill** — ring fills and counts up when an answer unlocks schemes.

`prefers-reduced-motion: reduce` → opacity fades only.

## Components (`apps/web/src/shared/ui`)

| Component | Variants / props | Notes |
| --- | --- | --- |
| `GlassCard` | `level: thin \| glass \| strong`, `interactive` | hover lift 2 px on desktop only |
| `GlassButton` | `primary` (gradient), `secondary` (glass), `ghost`, `danger`; `size: md \| lg` | lg = 56 px tall |
| `IconButton` | `label` required | 48 × 48 min |
| `MicButton` | `state: idle \| listening \| processing \| error` | 88 px; centre of Home |
| `Chip` | `filled \| unknown \| editable` | unknown chips dashed border + "?" |
| `VerdictBadge` | `status: eligible \| maybe \| ineligible` | icon + word + colour |
| `UnlockMeter` | `value`, `max`, `label` | ring progress |
| `ProfileMeter` | `known`, `total` | slim bar at top of intake |
| `QuickReply` | options[], allowsNotSure, allowsSkip | big tappable pills |
| `SegmentedTabs` | items with counts | glass track, solid thumb |
| `BottomSheet` | snap points | scheme detail on mobile |
| `BottomNav` | 4 items | Home, Results, Documents, Card |
| `Toast`, `Skeleton`, `EmptyState`, `OfflineBanner`, `LanguageTile` | | |

Icons (lucide): eligible `CheckCircle2`, maybe `CircleHelp`, ineligible `XCircle`, verify `ShieldAlert`, source `Link2`, read aloud `Volume2`, mic `Mic`.

## Accessibility checklist

- [ ] Contrast checked on both themes, against the brightest blob position.
- [ ] Every interactive element ≥ 48 × 48 px and has a visible focus ring (`--focus`, 3 px).
- [ ] Screen reader labels on icon buttons and badges ("Eligible", not just a tick).
- [ ] `lang` attribute switches with the language so screen readers pronounce Kannada/Hindi.
- [ ] Reduce transparency + reduce motion settings in-app (not only OS).
- [ ] Never more than 5 result cards before a "Show more".

## Low-power mode

Turn on automatically when `navigator.deviceMemory <= 2`, `navigator.hardwareConcurrency <= 4`, or Battery Saver is detected; user can override in Settings. Effects: `data-glass="off"`, static background, no shimmer, motion limited to fades.
