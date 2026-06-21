import { type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { paginationButtonVariants } from "./pagination.variants";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** Página atual (1-indexed). */
  currentPage: number;
  /** Total de páginas. */
  totalPages: number;
  /** Callback ao mudar de página. */
  onPageChange: (page: number) => void;
}

function getVisiblePages(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
}

/**
 * Pagination — navegação entre páginas de conteúdo paginado.
 *
 * Acessibilidade:
 * - Renderizado dentro de <nav aria-label="Paginação">.
 * - Página atual tem aria-current="page".
 * - Botões anterior/próximo têm aria-label descritivo.
 * - Botões desabilitados usam disabled (não apenas opacity).
 */
export function Pagination({ currentPage, totalPages, onPageChange, className, ...props }: PaginationProps) {
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav aria-label="Paginação" className={cn("flex items-center", className)} {...props}>
      <ul className="flex items-center gap-1">
        <li>
          <button
            type="button"
            aria-label="Página anterior"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={cn(paginationButtonVariants({ active: false }))}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </li>

        {pages.map((page, idx) =>
          page === "..." ? (
            <li key={`ellipsis-${idx}`} aria-hidden="true">
              <span className="flex h-8 w-8 items-center justify-center text-sm text-text-subtle">…</span>
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                aria-label={`Página ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                onClick={() => onPageChange(page)}
                className={cn(paginationButtonVariants({ active: page === currentPage }))}
              >
                {page}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            aria-label="Próxima página"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className={cn(paginationButtonVariants({ active: false }))}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}
