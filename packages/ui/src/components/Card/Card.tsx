import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { cardVariants, type CardVariants } from "./card.variants";

export interface CardRootProps
  extends HTMLAttributes<HTMLDivElement>, CardVariants {}

/**
 * Card — container de conteúdo do Design System.
 *
 * Acessibilidade: Card em si é um container neutro (sem role especial).
 * Se o card for inteiramente clicável, prefira envolver o conteúdo em um
 * `<button>` ou `<a>` semântico em vez de usar onClick na div do Card.
 */

export const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(
  ({ className, padding, elevation, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ padding, elevation }), className)}
        {...props}
      />
    );
  },
);
CardRoot.displayName = "Card.Root";

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-3 flex flex-col gap-1", className)} {...props} />
  );
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4";
}

export function CardTitle({
  as: Tag = "h3",
  className,
  ...props
}: CardTitleProps) {
  return (
    <Tag
      className={cn("text-lg font-semibold text-text", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-text-subtle", className)} {...props} />;
}

export function CardBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-md text-text", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-4 flex items-center gap-2", className)} {...props} />
  );
}

export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
};
