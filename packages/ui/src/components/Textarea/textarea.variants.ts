import { cva, type VariantProps } from "class-variance-authority";

export const textareaVariants = cva(
  "w-full rounded-md border bg-surface px-3 py-2 text-sm text-text placeholder:text-text-subtle " +
    "transition-colors resize-y min-h-[80px] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 " +
    "disabled:cursor-not-allowed disabled:opacity-50",
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

export type TextareaVariants = VariantProps<typeof textareaVariants>;
