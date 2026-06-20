/**
 * Tipos do futuro Accessibility Auditor (Fase 2).
 *
 * NÃO IMPLEMENTADO — este pacote existe apenas para documentar o contrato
 * que a feature real vai seguir quando for construída.
 */

export type AuditSeverity = "error" | "warning" | "info";

export type AuditRule =
  | "color-contrast"
  | "missing-aria-label"
  | "non-semantic-interactive-element"
  | "missing-keyboard-handler"
  | "missing-focus-indicator";

export interface AuditResult {
  rule: AuditRule;
  severity: AuditSeverity;
  element: string;
  message: string;
  suggestion?: string;
}

export type AuditComponentFn = (
  componentSource: string,
) => Promise<AuditResult[]>;
