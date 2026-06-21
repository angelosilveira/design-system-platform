import { cva, type VariantProps } from "class-variance-authority";

export const tabsListVariants = cva(
  "inline-flex items-center gap-1 rounded-md bg-surface-subtle p-1",
);

export const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 " +
    "disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      active: {
        true: "bg-surface text-text shadow-sm",
        false: "text-text-subtle hover:text-text",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>;
