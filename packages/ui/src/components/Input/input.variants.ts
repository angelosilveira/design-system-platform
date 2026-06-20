import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  "w-full rounded-md border bg-surface px-3 text-md text-text transition-colors " +
    "placeholder:text-text-subtle " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 " +
    "disabled:pointer-events-none disabled:opacity-50 disabled:bg-surface-subtle",
  {
    variants: {
      state: {
        default: "border-border focus-visible:ring-primary",
        error: "border-danger focus-visible:ring-danger",
      },
      size: {
        sm: "h-8 text-sm",
        md: "h-10 text-md",
        lg: "h-12 text-lg",
      },
    },
    defaultVariants: {
      state: "default",
      size: "md",
    },
  },
);

export type InputVariants = VariantProps<typeof inputVariants>;
