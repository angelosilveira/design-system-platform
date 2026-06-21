export * from "./colors";
export * from "./spacing";
export * from "./typography";
export * from "./radius-shadow";
export * from "./themes";
export { generateThemeCss } from "./transformers/css-transformer";
export type { TokenTransformer } from "./transformers/types";

import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { radius, shadow } from "./radius-shadow";

/**
 * Objeto consolidado de tokens — fonte única de verdade.
 *
 * Conecta os tokens ao `tailwind.config.ts` (via `theme.extend`) e ao
 * Token Manager: o mesmo schema é transformado em CSS custom properties
 * via `generateThemeCss()` (CSS Transformer — implementado em Fase 2).
 */
export const tokens = {
  colors,
  spacing,
  typography,
  radius,
  shadow,
} as const;

export type DesignTokens = typeof tokens;
