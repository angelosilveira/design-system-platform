import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { badgeVariants, type BadgeVariants } from "./badge.variants";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BadgeVariants {
  children: ReactNode;
}

/**
 * Badge — marcador visual compacto para status, categorias e contagens.
 *
 * Acessibilidade:
 * - Renderizado como <span> inline — não interativo por padrão.
 * - Para badges de status em listas, considere adicionar um sr-only
 *   que descreva o contexto (ex: "Status: Ativo").
 */
export function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </span>
  );
}
