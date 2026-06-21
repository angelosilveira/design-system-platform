/**
 * Gera arquivos CSS com custom properties para cada tema.
 *
 * Saída:
 *   packages/tokens/dist/themes.css  — todos os temas num único arquivo
 *
 * Uso:
 *   pnpm --filter @design-system/tokens generate
 */
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { lightColors, darkColors, brandColors } from "../src/themes/index.js";
import { generateThemeCss } from "../src/transformers/css-transformer.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");

mkdirSync(distDir, { recursive: true });

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

writeFileSync(resolve(distDir, "themes.css"), css, "utf-8");

console.log("✅ CSS de temas gerado em packages/tokens/dist/themes.css");
