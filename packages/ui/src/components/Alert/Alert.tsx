import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { alertVariants, type AlertVariants } from "./alert.variants";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title">, AlertVariants {
  /** Título opcional em negrito acima do conteúdo. */
  title?: string;
  children: ReactNode;
  /** Callback de dismissal — exibe botão de fechar quando fornecido. */
  onDismiss?: () => void;
}

function AlertIcon({ variant }: { variant: AlertProps["variant"] }) {
  const classes = "h-4 w-4 shrink-0 mt-0.5";
  if (variant === "success") {
    return (
      <svg className={classes} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" className="text-success" />
        <path d="M6.5 10L9 12.5L13.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-success" />
      </svg>
    );
  }
  if (variant === "warning") {
    return (
      <svg className={classes} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 3L18 17H2L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="text-warning" />
        <path d="M10 9v3M10 14.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-warning" />
      </svg>
    );
  }
  if (variant === "danger") {
    return (
      <svg className={classes} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" className="text-danger" />
        <path d="M10 6v5M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-danger" />
      </svg>
    );
  }
  return (
    <svg className={classes} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
      <path d="M10 9v5M10 6.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-primary" />
    </svg>
  );
}

/**
 * Alert — mensagem de feedback contextual com ícone e variantes de severidade.
 *
 * Acessibilidade:
 * - `role="alert"` anuncia automaticamente o conteúdo a leitores de tela.
 * - Ícone é aria-hidden — o significado é transmitido pela variante e texto.
 * - Botão de fechar tem aria-label descritivo.
 */
export function Alert({ className, variant = "info", title, children, onDismiss, ...props }: AlertProps) {
  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      <AlertIcon variant={variant} />

      <div className="flex-1 space-y-1">
        {title && <p className="font-medium text-text">{title}</p>}
        <div className="text-text-subtle">{children}</div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fechar alerta"
          className="shrink-0 rounded p-0.5 text-text-subtle hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
