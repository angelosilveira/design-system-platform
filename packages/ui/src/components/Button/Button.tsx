import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { buttonVariants, type ButtonVariants } from "./button.variants";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  /**
   * Exibe estado de carregamento e desabilita o botão automaticamente.
   * Anuncia a mudança de estado para leitores de tela via aria-busy.
   */
  isLoading?: boolean;
}

/**
 * Button — componente base de ação do Design System.
 *
 * Acessibilidade:
 * - `aria-busy` + `aria-disabled` no estado de loading, em vez de remover
 *   o elemento do DOM, mantendo o foco navegável e o anúncio correto.
 * - Foco visível customizado via `focus-visible` (não remove o outline
 *   nativo sem substituí-lo).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        aria-disabled={disabled || isLoading || undefined}
        {...props}
      >
        {isLoading && (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
