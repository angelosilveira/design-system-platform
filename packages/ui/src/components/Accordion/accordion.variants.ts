import { cva, type VariantProps } from "class-variance-authority";

export const accordionItemVariants = cva(
  "border-b border-border last:border-b-0 transition-colors duration-200"
);

export const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-text " +
    "transition-colors duration-200 hover:text-primary " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
);

export const accordionContentVariants = cva(
  "px-5 pb-5 text-sm leading-relaxed text-text-subtle"
);

export type AccordionVariants = VariantProps<typeof accordionItemVariants>;
