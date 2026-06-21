import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-surface-subtle text-text border border-border",
        primary: "bg-primary text-text-inverse",
        success: "bg-success text-text-inverse",
        danger: "bg-danger text-text-inverse",
        warning: "bg-warning text-text-inverse",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
