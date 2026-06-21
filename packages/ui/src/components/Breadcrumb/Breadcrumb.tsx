import { type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { breadcrumbLinkVariants } from "./breadcrumb.variants";

export interface BreadcrumbRootProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Rótulo da região de navegação. Padrão: "Navegação estrutural". */
  label?: string;
}

/**
 * Breadcrumb.Root — navegação hierárquica da página.
 *
 * Acessibilidade:
 * - Renderizado como <nav aria-label> para identificar a região.
 * - Lista ordenada <ol> comunica a sequência hierárquica.
 * - Item atual usa aria-current="page" e não é link.
 * - Separadores são aria-hidden.
 */
export function BreadcrumbRoot({
  children,
  label = "Navegação estrutural",
  className,
  ...props
}: BreadcrumbRootProps) {
  return (
    <nav aria-label={label} className={cn("flex", className)} {...props}>
      <ol className="flex items-center gap-1.5 flex-wrap">{children}</ol>
    </nav>
  );
}

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

/** Breadcrumb.Item — item da lista de breadcrumb (envolve Link ou Page). */
export function BreadcrumbItem({ children, className, ...props }: BreadcrumbItemProps) {
  return (
    <li className={cn("flex items-center gap-1.5", className)} {...props}>
      {children}
    </li>
  );
}

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

/** Breadcrumb.Link — link clicável para um nível anterior da hierarquia. */
export function BreadcrumbLink({ children, className, ...props }: BreadcrumbLinkProps) {
  return (
    <a className={cn(breadcrumbLinkVariants({ current: false }), className)} {...props}>
      {children}
    </a>
  );
}

export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

/** Breadcrumb.Page — item atual da navegação (não é link). */
export function BreadcrumbPage({ children, className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      aria-current="page"
      className={cn(breadcrumbLinkVariants({ current: true }), className)}
      {...props}
    >
      {children}
    </span>
  );
}

export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLSpanElement> {}

/** Breadcrumb.Separator — divisor visual entre itens, oculto de leitores de tela. */
export function BreadcrumbSeparator({ className, ...props }: BreadcrumbSeparatorProps) {
  return (
    <span aria-hidden="true" className={cn("text-text-subtle select-none", className)} {...props}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export const Breadcrumb = {
  Root: BreadcrumbRoot,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
};
