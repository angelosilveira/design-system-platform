import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva("rounded-lg border border-border bg-surface", {
  variants: {
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    },
    elevation: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
    },
  },
  defaultVariants: {
    padding: "md",
    elevation: "none",
  },
});

export type CardVariants = VariantProps<typeof cardVariants>;
