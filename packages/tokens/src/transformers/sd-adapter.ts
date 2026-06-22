import type { ThemeColors } from "../themes";

type SDColorToken = { value: string; type: "color" };
type SDColorGroup = Record<string, SDColorToken>;
export type SDTokens = { color: Record<string, SDColorGroup> };

/**
 * Converte nosso ThemeColors para o formato de tokens do Style Dictionary.
 *
 * ThemeColors:  { primary: { DEFAULT: "#0052CC", hover: "#0747A6" } }
 * SD tokens:    { color: { primary: { default: { value: "#0052CC", type: "color" } } } }
 *
 * A chave "DEFAULT" vira "default" (convenção SD / DTCG).
 */
export function toSDTokens(colors: ThemeColors): SDTokens {
  const color: Record<string, SDColorGroup> = {};

  for (const [group, values] of Object.entries(colors)) {
    color[group] = {};
    for (const [key, value] of Object.entries(values as Record<string, string>)) {
      const sdKey = key === "DEFAULT" ? "default" : key;
      color[group][sdKey] = { value, type: "color" };
    }
  }

  return { color };
}
