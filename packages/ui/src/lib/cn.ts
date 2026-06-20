import { clsx, type ClassValue } from "clsx";

/**
 * Helper para combinar classes condicionalmente — usado em conjunto com
 * `cva` em todos os componentes para manter a árvore de classes legível.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
