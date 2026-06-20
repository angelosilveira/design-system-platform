export * from "./colors";
export * from "./spacing";
export * from "./typography";
export * from "./radius-shadow";

import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { radius, shadow } from "./radius-shadow";

/**
 * Objeto consolidado de tokens — fonte única de verdade.
 *
 * Este objeto é o que conecta os tokens ao `tailwind.config.ts` (via
 * `theme.extend`) e, futuramente, ao gerador multiplataforma do Token
 * Manager (Fase 2): o mesmo schema poderá ser transformado em saídas para
 * Android (Kotlin), iOS (Swift) e CSS puro, sem reescrever os valores.
 */
export const tokens = {
  colors,
  spacing,
  typography,
  radius,
  shadow,
} as const;

export type DesignTokens = typeof tokens;
