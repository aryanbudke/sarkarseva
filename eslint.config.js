import js from "@eslint/js";
import tseslint from "typescript-eslint";

const legacyBan = {
  group: ["**/legacy/**"],
  message: "legacy/ is a read-only reference. Copy ideas, never import.",
};

export default tseslint.config(
  // Global ignores must be an object with only `ignores`.
  { ignores: ["legacy/**", "**/dist/**", "**/node_modules/**", "**/coverage/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-restricted-imports": ["error", { patterns: [legacyBan] }],
    },
  },
  {
    files: ["packages/engine/**/*.ts"],
    ignores: ["**/*.test.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            legacyBan,
            {
              regex: "^(?!@yojana/contracts$|\\.{1,2}/)",
              message: "packages/engine may import only @yojana/contracts and its own files.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["apps/web/src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            legacyBan,
            { group: ["@/features/*/*"], message: "Import another feature only through its index.ts." },
            { group: ["@/app", "@/app/*"], message: "Features must not import app/." },
          ],
        },
      ],
    },
  },
  {
    files: ["apps/web/src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            legacyBan,
            { group: ["@/features", "@/features/*", "@/app", "@/app/*"], message: "shared/ must not import features/ or app/." },
          ],
        },
      ],
    },
  },
);
