import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      provider: "v8",              // usa el motor de V8 (rápido)
      reporter: ["text", "html"],  // "text" = tabla en consola, "html" = reporte bonito en navegador
      reportsDirectory: "./coverage",
      include: ["src/**/*.ts"],
      exclude: ["**/*.d.ts", "vitest.config.ts"],
    },
  },
});