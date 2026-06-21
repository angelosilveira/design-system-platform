import { cva, type VariantProps } from "class-variance-authority";

export const paginationButtonVariants = cva(
  "inline-flex h-8 min-w-[2rem] items-center justify-center rounded-md border border-border px-2 text-sm " +
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 " +
    "disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      active: {
        true: "bg-primary text-text-inverse border-primary",
        false: "bg-surface text-text hover:bg-surface-subtle",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export type PaginationButtonVariants = VariantProps<typeof paginationButtonVariants>;
