const SAMPLE = "Lakshmi may qualify for 3 schemes";

const STEPS = [
  ["display", "font-display text-display"],
  ["h1", "font-display text-h1"],
  ["h2", "font-display text-h2"],
  ["h3", "text-h3"],
  ["body", "text-body"],
  ["small", "text-small"],
  ["micro", "text-micro uppercase tracking-wide"],
] as const;

export function TypeScale() {
  return (
    <ul className="space-y-4">
      {STEPS.map(([name, classes]) => (
        <li key={name}>
          <p className="text-micro text-ink-3">{name}</p>
          <p className={classes}>{SAMPLE}</p>
        </li>
      ))}
    </ul>
  );
}
