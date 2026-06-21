import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { textareaVariants } from "./textarea.variants";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Rótulo visível, sempre associado ao textarea via htmlFor/id. */
  label: string;
  /** Mensagem de erro — define estado visual e conecta via aria-invalid + aria-describedby. */
  errorMessage?: string;
  /** Texto de apoio exibido abaixo do campo quando não há erro. */
  helperText?: string;
}

/**
 * Textarea — campo de texto multilinha do Design System.
 *
 * Acessibilidade:
 * - `label` é obrigatório (não aceita só placeholder como rótulo).
 * - `aria-describedby` aponta para a mensagem de erro ou texto de apoio.
 * - `aria-invalid` reflete o estado de erro para tecnologias assistivas.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, errorMessage, helperText, id, required, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const descriptionId = `${textareaId}-description`;
    const hasError = Boolean(errorMessage);

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={textareaId} className="text-sm font-medium text-text">
          {label}
          {required && (
            <span className="text-danger" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>

        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={errorMessage || helperText ? descriptionId : undefined}
          className={cn(textareaVariants({ state: hasError ? "error" : "default" }), className)}
          {...props}
        />

        {(errorMessage || helperText) && (
          <p
            id={descriptionId}
            className={cn("text-sm", hasError ? "text-danger" : "text-text-subtle")}
            role={hasError ? "alert" : undefined}
          >
            {errorMessage ?? helperText}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
