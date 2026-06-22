import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    // Limita workers para evitar timeouts quando o sistema está sob carga
    // (ex: durante pre-commit hook com Storybook ou VS Code rodando)
    maxForks: 4,
  },
});
