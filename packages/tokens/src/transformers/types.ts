import type { DesignTokens } from "../index";

/**
 * Contrato para transformers do Token Manager multiplataforma.
 *
 * CSS implementado em `css-transformer.ts` via `generateThemeCss()`.
 * Android e iOS seguem o mesmo contrato quando implementados.
 */
export interface TokenTransformer {
  platform: "android" | "ios" | "css";
  transform: (tokens: DesignTokens) => string;
}
