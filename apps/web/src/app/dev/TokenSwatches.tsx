const TOKENS = [
  ["base", "bg-base"],
  ["surface", "glass"],
  ["surface-thin", "glass-thin"],
  ["border", "glass-border"],
  ["ink", "text-1"],
  ["ink-2", "text-2"],
  ["ink-3", "text-3"],
  ["accent", "accent-from"],
  ["accent-ink", "accent-ink"],
  ["on-accent", "on-accent"],
  ["focus", "focus"],
  ["ok", "ok"],
  ["maybe", "maybe"],
  ["no", "no"],
  ["info", "info"],
  ["danger", "danger"],
] as const;

export function TokenSwatches() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {TOKENS.map(([name, cssVar]) => (
        <li key={name} className="overflow-hidden rounded-control border border-border bg-surface">
          <div className="h-14 border-b border-border" style={{ backgroundColor: `var(--${cssVar})` }} />
          <p className="px-3 pt-2 text-small text-ink">{name}</p>
          <p className="px-3 pb-2 text-micro text-ink-3">--{cssVar}</p>
        </li>
      ))}
    </ul>
  );
}
