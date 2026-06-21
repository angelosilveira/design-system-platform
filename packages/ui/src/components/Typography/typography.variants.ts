import { cva, type VariantProps } from "class-variance-authority";

export const headingVariants = cva("font-semibold text-text leading-tight", {
  variants: {
    size: {
      "3xl": "text-3xl",
      "2xl": "text-2xl",
      xl: "text-xl",
      lg: "text-lg",
      md: "text-md",
      sm: "text-sm",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

export const textVariants = cva("text-text", {
  variants: {
    size: {
      lg: "text-lg",
      md: "text-md",
      sm: "text-sm",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    subtle: {
      true: "text-text-subtle",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
  },
});

export type HeadingVariants = VariantProps<typeof headingVariants>;
export type TextVariants = VariantProps<typeof textVariants>;
