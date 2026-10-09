import { defineConfig } from "vitest/config";

// Only workspace folders are test projects, so legacy/ is never collected.
export default defineConfig({
  test: {
    projects: ["apps/*", "packages/*"],
  },
});
