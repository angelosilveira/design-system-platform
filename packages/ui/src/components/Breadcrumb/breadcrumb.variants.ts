import { cva, type VariantProps } from "class-variance-authority";

export const breadcrumbLinkVariants = cva(
  "text-sm transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm",
  {
    variants: {
      current: {
        true: "font-medium text-text pointer-events-none",
        false: "text-text-subtle hover:text-text",
      },
    },
    defaultVariants: {
      current: false,
    },
  },
);

export type BreadcrumbLinkVariants = VariantProps<typeof breadcrumbLinkVariants>;
