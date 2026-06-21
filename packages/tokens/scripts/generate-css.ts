/**
 * Gera o arquivo de CSS custom properties para os três temas.
 *
 * Saída:
 *   packages/tokens/dist/themes.css            — saída canônica (consumidores externos)
 *   apps/storybook/.storybook/tokens.css       — consumido pelo Storybook via @import
 *
 * Uso:
 *   pnpm --filter @design-system/tokens generate
 *
 * Rode sempre que alterar qualquer arquivo em packages/tokens/src/themes/.
 */
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { lightColors, darkColors, brandColors } from "../src/themes/index.js";
import { generateThemeCss } from "../src/transformers/css-transformer.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "../../..");

const css = [
  "/* Auto-gerado por packages/tokens/scripts/generate-css.ts */",
  "/* NÃO EDITE MANUALMENTE — rode: pnpm --filter @design-system/tokens generate */",
  "",
  generateThemeCss(lightColors, ":root"),
  "",
  generateThemeCss(darkColors, "[data-theme='dark']"),
  "",
  generateThemeCss(brandColors, "[data-theme='brand']"),
  "",
].join("\n");

// Saída 1 — arquivo canônico em packages/tokens/dist/
const distDir = resolve(__dirname, "../dist");
mkdirSync(distDir, { recursive: true });
writeFileSync(resolve(distDir, "themes.css"), css, "utf-8");

// Saída 2 — atualiza o Storybook diretamente (sem copiar manualmente)
const storybookTokensPath = resolve(root, "apps/storybook/.storybook/tokens.css");
writeFileSync(storybookTokensPath, css, "utf-8");

console.log("✅ CSS de temas gerado em:");
console.log("   packages/tokens/dist/themes.css");
console.log("   apps/storybook/.storybook/tokens.css");
