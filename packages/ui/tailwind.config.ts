import type { Config } from "tailwindcss";
import { tokens } from "@design-system/tokens";

/**
 * Tailwind config gerado a partir dos design tokens.
 *
 * Importante: nenhum valor de cor/espaçamento/tipografia é declarado aqui
 * diretamente — tudo vem de `@design-system/tokens`. Trocar um token reflete
 * automaticamente em todos os componentes que usam classes Tailwind, sem
 * precisar editar este arquivo.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        secondary: tokens.colors.secondary,
        danger: tokens.colors.danger,
        success: tokens.colors.success,
        warning: tokens.colors.warning,
        surface: tokens.colors.surface,
        border: tokens.colors.border,
        text: tokens.colors.text,
      },
      spacing: tokens.spacing,
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.fontSize,
      fontWeight: tokens.typography.fontWeight,
      lineHeight: tokens.typography.lineHeight,
      borderRadius: tokens.radius,
      boxShadow: tokens.shadow,
    },
  },
  plugins: [],
};

export default config;
