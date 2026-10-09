import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

const TEXT_MIN = 4.5; // WCAG 1.4.3, body text
const NON_TEXT_MIN = 3; // WCAG 1.4.11, focus ring

const css = readFileSync(new URL("../tokens.css", import.meta.url), "utf8");
const lightBlock = /:root\[data-theme="light"\]\s*\{([^}]*)\}/.exec(css)?.[1] ?? "";
const light = Object.fromEntries(
  [...lightBlock.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6});/gi)].map(([, name, hex]) => [name, hex]),
);

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05);
}

function token(name: string): string {
  const value = light[name];
  if (!value) throw new Error(`--${name} missing from the light theme in tokens.css`);
  return value;
}

describe("light theme contrast", () => {
  test("contrast() matches known WCAG values", () => {
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrast("#ffffff", "#ffffff")).toBeCloseTo(1, 5);
  });

  const texts = ["text-1", "text-2", "text-3", "accent-ink", "ok", "maybe", "no", "info", "danger"];
  const surfaces = ["bg-base", "glass", "glass-thin"];

  test.each(texts.flatMap((t) => surfaces.map((s) => [t, s])))("--%s on --%s ≥ 4.5:1", (text, surface) => {
    expect(contrast(token(text), token(surface))).toBeGreaterThanOrEqual(TEXT_MIN);
  });

  test("text on the saffron button ≥ 4.5:1", () => {
    expect(contrast(token("on-accent"), token("accent-from"))).toBeGreaterThanOrEqual(TEXT_MIN);
  });

  test.each(surfaces)("focus ring on --%s ≥ 3:1", (surface) => {
    expect(contrast(token("focus"), token(surface))).toBeGreaterThanOrEqual(NON_TEXT_MIN);
  });
});
