import { type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { skeletonVariants, type SkeletonVariants } from "./skeleton.variants";

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>, SkeletonVariants {
  /** Largura (ex: "100px", "100%", "4rem"). Defaults para 100% em line/rect. */
  width?: string;
  /** Altura (ex: "16px", "2rem"). Required para circle e rect. */
  height?: string;
}

/**
 * Skeleton — placeholder animado para estado de carregamento.
 *
 * Acessibilidade:
 * - `aria-hidden="true"` — ocultado de leitores de tela.
 * - Envolva múltiplos Skeletons em um contêiner com `aria-label` e `aria-busy`
 *   para anunciar que o conteúdo está carregando.
 */
export function Skeleton({
  className,
  variant,
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(skeletonVariants({ variant }), className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}
