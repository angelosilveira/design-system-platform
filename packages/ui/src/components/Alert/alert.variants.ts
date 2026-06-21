import { cva, type VariantProps } from "class-variance-authority";

export const alertVariants = cva(
  "flex items-start gap-3 rounded-md border p-4 text-sm",
  {
    variants: {
      variant: {
        info: "bg-primary/10 border-primary/30 text-text",
        success: "bg-success/10 border-success/30 text-text",
        warning: "bg-warning/10 border-warning/30 text-text",
        danger: "bg-danger/10 border-danger/30 text-text",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

export type AlertVariants = VariantProps<typeof alertVariants>;
