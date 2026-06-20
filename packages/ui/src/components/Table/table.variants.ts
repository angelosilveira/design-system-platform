import { cva } from "class-variance-authority";

export const tableVariants = cva("w-full border-collapse text-md text-text");

export const tableHeaderCellVariants = cva(
  "border-b border-border px-3 py-2 text-left text-sm font-semibold text-text-subtle",
);

export const tableCellVariants = cva(
  "border-b border-border px-3 py-2 text-text",
);

export const tableRowVariants = cva("transition-colors", {
  variants: {
    isClickable: {
      true: "cursor-pointer hover:bg-surface-subtle",
      false: "",
    },
  },
  defaultVariants: {
    isClickable: false,
  },
});
