import type { Config } from "tailwindcss";
import { tokens } from "@design-system/tokens";

/**
 * Tailwind config do Storybook — usa CSS custom properties para suporte a temas.
 *
 * As cores referenciam `var(--ds-color-*)` definidas em `.storybook/tailwind.css`.
 * Trocar `data-theme` no <html> altera todos os componentes em runtime sem rebuild.
 *
 * Tokens não-cor (spacing, tipografia, radius, shadow) são invariantes entre temas.
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
        primary: {
          DEFAULT: "var(--ds-color-primary)",
          hover: "var(--ds-color-primary-hover)",
          subtle: "var(--ds-color-primary-subtle)",
        },
        secondary: {
          DEFAULT: "var(--ds-color-secondary)",
          hover: "var(--ds-color-secondary-hover)",
          subtle: "var(--ds-color-secondary-subtle)",
        },
        danger: {
          DEFAULT: "var(--ds-color-danger)",
          hover: "var(--ds-color-danger-hover)",
          subtle: "var(--ds-color-danger-subtle)",
        },
        success: {
          DEFAULT: "var(--ds-color-success)",
          hover: "var(--ds-color-success-hover)",
          subtle: "var(--ds-color-success-subtle)",
        },
        warning: {
          DEFAULT: "var(--ds-color-warning)",
          hover: "var(--ds-color-warning-hover)",
          subtle: "var(--ds-color-warning-subtle)",
        },
        surface: {
          DEFAULT: "var(--ds-color-surface)",
          subtle: "var(--ds-color-surface-subtle)",
          inverse: "var(--ds-color-surface-inverse)",
        },
        border: {
          DEFAULT: "var(--ds-color-border)",
          strong: "var(--ds-color-border-strong)",
        },
        text: {
          DEFAULT: "var(--ds-color-text)",
          subtle: "var(--ds-color-text-subtle)",
          inverse: "var(--ds-color-text-inverse)",
          disabled: "var(--ds-color-text-disabled)",
        },
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
