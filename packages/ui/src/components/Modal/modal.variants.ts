import { cva, type VariantProps } from "class-variance-authority";

export const modalContentVariants = cva(
  "relative w-full rounded-lg bg-surface p-6 shadow-lg " + "focus:outline-none",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type ModalContentVariants = VariantProps<typeof modalContentVariants>;
