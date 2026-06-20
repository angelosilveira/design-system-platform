import { cva, type VariantProps } from "class-variance-authority";

export const snackbarVariants = cva(
  "pointer-events-auto flex items-start gap-3 rounded-md border p-4 shadow-md",
  {
    variants: {
      variant: {
        default: "border-border bg-surface text-text",
        success: "border-success bg-success-subtle text-text",
        danger: "border-danger bg-danger-subtle text-text",
        warning: "border-warning bg-warning-subtle text-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type SnackbarVariants = VariantProps<typeof snackbarVariants>;
