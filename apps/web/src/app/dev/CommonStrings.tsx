import en from "@/shared/i18n/common/en.json";
import hi from "@/shared/i18n/common/hi.json";
import kn from "@/shared/i18n/common/kn.json";
import { flattenKeys } from "@/shared/i18n/flatten-keys";

const LANGS = [
  ["en", flattenKeys(en)],
  ["kn", flattenKeys(kn)],
  ["hi", flattenKeys(hi)],
] as const;

export function CommonStrings() {
  return (
    <div className="space-y-4">
      {Object.keys(LANGS[0][1]).map((key) => (
        <dl key={key} className="rounded-control border border-border bg-surface p-4">
          <dt className="text-micro text-ink-3">common:{key}</dt>
          {LANGS.map(([lang, strings]) => (
            <dd key={lang} lang={lang} className="mt-1 flex gap-3 text-body">
              <span className="w-6 shrink-0 text-micro text-ink-3">{lang}</span>
              <span className={strings[key] ? "text-ink" : "text-ink-3 italic"}>
                {strings[key] ?? "falls back to en"}
              </span>
            </dd>
          ))}
        </dl>
      ))}
    </div>
  );
}
