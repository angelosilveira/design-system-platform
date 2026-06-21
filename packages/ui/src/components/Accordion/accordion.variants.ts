import { cva, type VariantProps } from "class-variance-authority";

export const accordionItemVariants = cva("border-b border-border last:border-b-0");

export const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between py-4 text-sm font-medium text-text transition-colors " +
    "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
);

export const accordionContentVariants = cva("overflow-hidden text-sm text-text-subtle transition-all");

export type AccordionVariants = VariantProps<typeof accordionItemVariants>;
