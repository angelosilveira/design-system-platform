import { cva, type VariantProps } from "class-variance-authority";

export const menuContentVariants = cva(
  "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface shadow-md",
  {
    variants: {
      align: {
        start: "left-0",
        end: "right-0",
      },
    },
    defaultVariants: {
      align: "start",
    },
  },
);

export const menuItemVariants = cva(
  "flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-text transition-colors " +
    "hover:bg-surface-subtle focus-visible:outline-none focus-visible:bg-surface-subtle " +
    "disabled:pointer-events-none disabled:opacity-50",
);

export type MenuContentVariants = VariantProps<typeof menuContentVariants>;
