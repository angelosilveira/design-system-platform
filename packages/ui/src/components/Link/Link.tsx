import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { linkVariants, type LinkVariants } from "./link.variants";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, LinkVariants {
  children: ReactNode;
  /**
   * Quando true, adiciona automaticamente target="_blank" e
   * rel="noopener noreferrer", além do ícone de link externo.
   */
  external?: boolean;
}

/**
 * Link — ancora estilizada com suporte a links externos.
 *
 * Acessibilidade:
 * - Links externos incluem ícone de aviso com texto visível para leitores
 *   de tela ("abre em nova aba") via span.sr-only.
 * - rel="noopener noreferrer" previne ataques de tabnapping em links externos.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, external = false, children, href, ...props }, ref) => {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <a
        ref={ref}
        href={href}
        className={cn(linkVariants({ variant }), className)}
        {...externalProps}
        {...props}
      >
        {children}
        {external && (
          <>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M7 2H10V5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 2L5.5 6.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M5 3H2.5C2.22386 3 2 3.22386 2 3.5V9.5C2 9.77614 2.22386 10 2.5 10H8.5C8.77614 10 9 9.77614 9 9.5V7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="sr-only">(abre em nova aba)</span>
          </>
        )}
      </a>
    );
  },
);

Link.displayName = "Link";
