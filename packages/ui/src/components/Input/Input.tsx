import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { inputVariants, type InputVariants } from "./input.variants";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, InputVariants {
  /** Rótulo visível, sempre associado ao input via htmlFor/id. */
  label: string;
  /**
   * Mensagem de erro. Quando presente, define automaticamente o estado
   * visual "error" e conecta via aria-describedby + aria-invalid.
   */
  errorMessage?: string;
  /** Texto de apoio exibido abaixo do campo quando não há erro. */
  helperText?: string;
}

/**
 * Input — campo de texto base do Design System.
 *
 * Acessibilidade:
 * - `label` é obrigatório (não aceita só placeholder como rótulo).
 * - `aria-describedby` aponta para a mensagem de erro ou texto de apoio,
 *   permitindo que leitores de tela anunciem o contexto certo.
 * - `aria-invalid` reflete o estado de erro para tecnologias assistivas.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      label,
      errorMessage,
      helperText,
      id,
      required,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = `${inputId}-description`;
    const hasError = Boolean(errorMessage);

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-sm font-medium text-text">
          {label}
          {required && (
            <span className="text-danger" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={
            errorMessage || helperText ? descriptionId : undefined
          }
          className={cn(
            inputVariants({ state: hasError ? "error" : "default", size }),
            className,
          )}
          {...props}
        />

        {(errorMessage || helperText) && (
          <p
            id={descriptionId}
            className={cn(
              "text-sm",
              hasError ? "text-danger" : "text-text-subtle",
            )}
            role={hasError ? "alert" : undefined}
          >
            {errorMessage ?? helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
