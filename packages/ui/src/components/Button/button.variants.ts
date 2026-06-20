import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  // base — aplicada a todas as variantes
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 " +
    "disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-text-inverse hover:bg-primary-hover",
        secondary: "bg-surface text-text border border-border hover:bg-surface-subtle",
        danger: "bg-danger text-text-inverse hover:bg-danger-hover",
        ghost: "bg-transparent text-text hover:bg-surface-subtle",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-md",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
