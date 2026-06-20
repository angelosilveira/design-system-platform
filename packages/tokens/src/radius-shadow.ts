/**
 * Design Tokens — Radius e Sombra
 */

export const radius = {
  none: "0px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  full: "9999px",
} as const;

export const shadow = {
  sm: "0 1px 2px rgba(9, 30, 66, 0.08)",
  md: "0 4px 8px rgba(9, 30, 66, 0.12)",
  lg: "0 8px 16px rgba(9, 30, 66, 0.16)",
} as const;

export type RadiusToken = typeof radius;
export type ShadowToken = typeof shadow;
