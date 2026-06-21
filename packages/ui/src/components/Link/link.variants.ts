import { cva, type VariantProps } from "class-variance-authority";

export const linkVariants = cva(
  "inline-flex items-center gap-1 transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm",
  {
    variants: {
      variant: {
        default: "text-primary underline-offset-4 hover:underline",
        subtle: "text-text-subtle hover:text-text",
        standalone: "text-primary font-medium no-underline hover:text-primary-hover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type LinkVariants = VariantProps<typeof linkVariants>;
