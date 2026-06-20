import { cva, type VariantProps } from "class-variance-authority";

export const datePickerTriggerVariants = cva(
  "flex w-full items-center justify-between rounded-md border bg-surface px-3 text-md text-text transition-colors " +
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

export type DatePickerTriggerVariants = VariantProps<
  typeof datePickerTriggerVariants
>;

export const dayCellVariants = cva(
  "flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
  {
    variants: {
      isSelected: {
        true: "bg-primary text-text-inverse hover:bg-primary-hover",
        false: "text-text hover:bg-surface-subtle",
      },
      isOutsideMonth: {
        true: "text-text-disabled",
        false: "",
      },
      isToday: {
        true: "font-semibold underline underline-offset-2",
        false: "",
      },
    },
    defaultVariants: {
      isSelected: false,
      isOutsideMonth: false,
      isToday: false,
    },
  },
);
