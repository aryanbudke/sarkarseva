import { describe, expect, test } from "vitest";
import en from "../common/en.json";
import hi from "../common/hi.json";
import kn from "../common/kn.json";
import { flattenKeys } from "../flatten-keys";

const enKeys = Object.keys(flattenKeys(en));

describe("common strings", () => {
  test("flattenKeys builds dot paths", () => {
    expect(flattenKeys({ a: { b: "x" }, c: "y" })).toEqual({ "a.b": "x", c: "y" });
  });

  // kn/hi may lag behind en (i18next falls back to en) but must never have keys en lacks.
  test.each([
    ["kn", kn],
    ["hi", hi],
  ])("%s has no keys missing from en", (_lang, messages) => {
    const orphans = Object.keys(flattenKeys(messages)).filter((key) => !enKeys.includes(key));
    expect(orphans).toEqual([]);
  });

  test.each([
    ["en", en],
    ["kn", kn],
    ["hi", hi],
  ])("%s has no empty strings", (_lang, messages) => {
    const empty = Object.entries(flattenKeys(messages)).filter(([, value]) => value.trim() === "");
    expect(empty).toEqual([]);
  });
});
