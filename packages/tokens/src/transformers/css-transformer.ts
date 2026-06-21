import type { ThemeColors } from "../themes";
import type { TokenTransformer } from "./types";

type Nested = { [key: string]: string | Nested };

function flattenColors(obj: Nested, prefix: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const varName = key === "DEFAULT" ? prefix : `${prefix}-${key}`;
    if (typeof value === "string") out[varName] = value;
    else Object.assign(out, flattenColors(value as Nested, varName));
  }
  return out;
}

/**
 * Gera um bloco CSS com custom properties a partir de uma paleta de cores.
 *
 * @param colors - objeto de cores (ThemeColors)
 * @param selector - seletor CSS alvo (padrão: ":root")
 *
 * @example
 * generateThemeCss(lightColors)
 * // :root { --ds-color-primary: #0052CC; ... }
 *
 * generateThemeCss(darkColors, "[data-theme='dark']")
 * // [data-theme='dark'] { --ds-color-primary: #4C9AFF; ... }
 */
export function generateThemeCss(colors: ThemeColors, selector = ":root"): string {
  const flat = flattenColors(colors as unknown as Nested, "--ds-color");
  const declarations = Object.entries(flat)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");
  return `${selector} {\n${declarations}\n}`;
}

/** Implementação do contrato TokenTransformer para a plataforma CSS. */
export const cssTransformer: TokenTransformer = {
  platform: "css",
  transform(tokens) {
    const { lightColors } = require("../themes/light");
    return generateThemeCss(lightColors as ThemeColors);
  },
};
