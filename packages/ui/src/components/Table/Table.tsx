import {
  type HTMLAttributes,
  type ThHTMLAttributes,
  type TdHTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";
import {
  tableCellVariants,
  tableHeaderCellVariants,
  tableRowVariants,
  tableVariants,
} from "./table.variants";

export interface TableRootProps extends HTMLAttributes<HTMLTableElement> {
  caption: string;
  captionVisuallyHidden?: boolean;
}

/**
 * Table — tabela de dados do Design System.
 *
 * Acessibilidade: caption obrigatório, th scope="col" em cabeçalhos,
 * cabeçalhos ordenáveis usam aria-sort + botão interno para navegação
 * por teclado.
 */

export function TableRoot({
  caption,
  captionVisuallyHidden,
  className,
  children,
  ...props
}: TableRootProps) {
  return (
    <div className="overflow-x-auto">
      <table className={cn(tableVariants(), className)} {...props}>
        <caption
          className={cn(
            "mb-2 text-left text-sm text-text-subtle",
            captionVisuallyHidden && "sr-only",
          )}
        >
          {caption}
        </caption>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({
  children,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props}>{children}</thead>;
}

export function TableBody({
  children,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props}>{children}</tbody>;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  isClickable?: boolean;
}

export function TableRow({ className, isClickable, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(tableRowVariants({ isClickable }), className)}
      {...props}
    />
  );
}

export type SortDirection = "ascending" | "descending" | "none";

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortDirection?: SortDirection;
  onSort?: () => void;
}

export function TableHeaderCell({
  className,
  children,
  sortDirection,
  onSort,
  scope = "col",
  ...props
}: TableHeaderCellProps) {
  const isSortable = Boolean(onSort);

  return (
    <th
      scope={scope}
      aria-sort={isSortable ? (sortDirection ?? "none") : undefined}
      className={cn(tableHeaderCellVariants(), className)}
      {...props}
    >
      {isSortable ? (
        <button
          type="button"
          onClick={onSort}
          className="flex items-center gap-1 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {children}
          <SortIcon direction={sortDirection ?? "none"} />
        </button>
      ) : (
        children
      )}
    </th>
  );
}

function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === "none") {
    return (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
        className="opacity-50"
      >
        <path
          d="M3 4.5L6 1.5L9 4.5M3 7.5L6 10.5L9 7.5"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    );
  }

  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={direction === "ascending" ? "M3 7L6 4L9 7" : "M3 5L6 8L9 5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TableCell({
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn(tableCellVariants(), className)} {...props} />;
}

export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
};
