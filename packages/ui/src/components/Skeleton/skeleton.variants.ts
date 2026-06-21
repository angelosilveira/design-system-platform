import { cva, type VariantProps } from "class-variance-authority";

export const skeletonVariants = cva(
  "animate-pulse bg-surface-subtle",
  {
    variants: {
      variant: {
        line: "h-4 w-full rounded",
        circle: "rounded-full",
        rect: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "line",
    },
  },
);

export type SkeletonVariants = VariantProps<typeof skeletonVariants>;
