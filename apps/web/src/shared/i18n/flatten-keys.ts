export type Messages = { [key: string]: string | Messages };

/** Turns nested i18n JSON into dot keys: { nav: { home: "Home" } } → { "nav.home": "Home" }. */
export function flattenKeys(messages: Messages, prefix = ""): Record<string, string> {
  return Object.entries(messages).reduce<Record<string, string>>((flat, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === "string" ? { ...flat, [path]: value } : { ...flat, ...flattenKeys(value, path) };
  }, {});
}
