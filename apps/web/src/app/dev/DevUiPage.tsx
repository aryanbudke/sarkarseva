import { useState } from "react";
import { CommonStrings } from "./CommonStrings";
import { TokenSwatches } from "./TokenSwatches";
import { TypeScale } from "./TypeScale";

type Theme = "light" | "dark";

// Dev-only route (/dev/ui): never shipped, so labels here are not translated.
export function DevUiPage() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme === "dark" ? "dark" : "light"));

  function toggleTheme() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }

  return (
    <main id="main" className="mx-auto max-w-3xl space-y-12 px-4 py-8 sm:py-12">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-micro uppercase tracking-wide text-accent-ink">/dev/ui · tokens</p>
          <h1 className="font-display text-h1">Design tokens</h1>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="min-h-12 rounded-control border border-border bg-surface px-5 text-small text-ink"
        >
          Theme: {theme}
        </button>
      </header>

      <section className="space-y-4" aria-labelledby="sample">
        <h2 id="sample" className="font-display text-h2">Sample</h2>
        <div className="space-y-4 rounded-card border border-border bg-surface p-6">
          <h3 className="text-h3">PM Kisan Samman Nidhi</h3>
          <p className="text-body text-ink-2">Placeholder copy to judge type on a card surface.</p>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="min-h-14 rounded-control bg-accent px-6 text-body font-semibold text-on-accent">
              Primary action
            </button>
            <button type="button" className="min-h-14 rounded-control border border-border bg-surface-thin px-6 text-body text-ink">
              Secondary
            </button>
            <a href="#swatches" className="inline-flex min-h-14 items-center px-2 text-body text-accent-ink underline underline-offset-4">
              Text link
            </a>
          </div>
        </div>
      </section>

      <section id="swatches" className="space-y-4" aria-labelledby="colours">
        <h2 id="colours" className="font-display text-h2">Colours</h2>
        <TokenSwatches />
      </section>

      <section className="space-y-4" aria-labelledby="type">
        <h2 id="type" className="font-display text-h2">Type</h2>
        <TypeScale />
      </section>

      <section className="space-y-4" aria-labelledby="strings">
        <h2 id="strings" className="font-display text-h2">Common strings</h2>
        <CommonStrings />
      </section>
    </main>
  );
}
