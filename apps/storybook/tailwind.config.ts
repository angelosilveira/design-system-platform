import type { Config } from "tailwindcss";
import { tokens } from "@design-system/tokens";

/**
 * Reaproveita exatamente a mesma fonte de tokens usada em packages/ui,
 * mas com o `content` apontando para onde as classes realmente são usadas
 * no contexto do Storybook (componentes do design system + stories).
 */
const config: Config = {
  content: [
    "../../packages/ui/src/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./.storybook/**/*.{ts,tsx}",
  ],
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
