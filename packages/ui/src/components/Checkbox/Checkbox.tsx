import { forwardRef, useEffect, useId, useRef, type InputHTMLAttributes, type MutableRefObject } from "react";
import { cn } from "../../lib/cn";
import { checkboxInputVariants } from "./checkbox.variants";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Rótulo visível, sempre associado ao input via htmlFor/id. */
  label: string;
  /** Mensagem de erro — define estado visual e conecta via aria-invalid + aria-describedby. */
  errorMessage?: string;
  /** Texto de apoio exibido abaixo do campo quando não há erro. */
  helperText?: string;
  /**
   * Estado indeterminado — exposto via propriedade DOM, não atributo HTML.
   * Útil para checkboxes "selecionar todos" com seleção parcial.
   */
  indeterminate?: boolean;
}

/**
 * Checkbox — campo de seleção booleana do Design System.
 *
 * Acessibilidade:
 * - `label` é obrigatório e associado ao input via htmlFor/id.
 * - `aria-invalid` e `aria-describedby` refletem o estado de erro.
 * - `indeterminate` é aplicado via propriedade DOM (não atributo HTML),
 *   o que é o único modo suportado pelos navegadores.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, label, errorMessage, helperText, indeterminate = false, id, required, disabled, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = `${inputId}-description`;
    const hasError = Boolean(errorMessage);
    const innerRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="relative flex h-4 w-4 shrink-0">
            <input
              ref={(node) => {
                innerRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) (ref as MutableRefObject<HTMLInputElement | null>).current = node;
              }}
              type="checkbox"
              id={inputId}
              disabled={disabled}
              required={required}
              aria-invalid={hasError || undefined}
              aria-describedby={errorMessage || helperText ? descriptionId : undefined}
              className={cn(
                checkboxInputVariants({ state: hasError ? "error" : "default" }),
                className,
              )}
              {...props}
            />
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden h-4 w-4 text-white peer-checked:block"
            >
              <path
                d="M3.5 8L6.5 11L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <label
            htmlFor={inputId}
            className={cn(
              "cursor-pointer select-none text-sm font-medium text-text",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {label}
            {required && (
              <span className="text-danger" aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
        </div>

        {(errorMessage || helperText) && (
          <p
            id={descriptionId}
            className={cn("pl-6 text-sm", hasError ? "text-danger" : "text-text-subtle")}
            role={hasError ? "alert" : undefined}
          >
            {errorMessage ?? helperText}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
