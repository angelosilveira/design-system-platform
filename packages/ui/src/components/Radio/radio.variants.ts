import { cva, type VariantProps } from "class-variance-authority";

export const radioInputVariants = cva(
  "peer h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-full border bg-surface transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 " +
    "disabled:cursor-not-allowed disabled:opacity-50 " +
    "checked:border-primary",
  {
    variants: {
      state: {
        default: "border-border",
        error: "border-danger",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export type RadioVariants = VariantProps<typeof radioInputVariants>;
