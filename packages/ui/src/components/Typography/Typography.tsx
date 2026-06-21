import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { headingVariants, textVariants, type HeadingVariants, type TextVariants } from "./typography.variants";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, HeadingVariants {
  /** Elemento HTML renderizado. Padrão h2. */
  as?: HeadingLevel;
  children: ReactNode;
}

/**
 * Typography.Heading — títulos semânticos com controle de nível e tamanho visual.
 *
 * Acessibilidade:
 * - Use `as` para o nível semântico correto na hierarquia da página (h1→h6).
 * - `size` controla apenas a aparência visual, independente do nível semântico.
 */
export function Heading({ as: Tag = "h2", className, size, children, ...props }: HeadingProps) {
  return (
    <Tag className={cn(headingVariants({ size }), className)} {...props}>
      {children}
    </Tag>
  );
}

export interface TextProps extends HTMLAttributes<HTMLParagraphElement>, TextVariants {
  /** Elemento HTML renderizado. Padrão p. */
  as?: ElementType;
  children: ReactNode;
}

/**
 * Typography.Text — texto de corpo com variantes de tamanho e peso.
 */
export function Text({ as: Tag = "p", className, size, weight, subtle, children, ...props }: TextProps) {
  return (
    <Tag className={cn(textVariants({ size, weight, subtle }), className)} {...(props as object)}>
      {children}
    </Tag>
  );
}

export interface CaptionProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

/**
 * Typography.Caption — texto auxiliar de menor destaque (12px).
 */
export function Caption({ className, children, ...props }: CaptionProps) {
  return (
    <span className={cn("text-xs text-text-subtle", className)} {...props}>
      {children}
    </span>
  );
}

export const Typography = {
  Heading,
  Text,
  Caption,
};
