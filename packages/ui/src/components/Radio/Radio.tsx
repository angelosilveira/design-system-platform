import { createContext, useContext, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { radioInputVariants } from "./radio.variants";

interface RadioContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  errorId?: string;
}

const RadioContext = createContext<RadioContextValue | null>(null);

function useRadioContext() {
  const ctx = useContext(RadioContext);
  if (!ctx) throw new Error("RadioItem deve ser usado dentro de <Radio.Group>");
  return ctx;
}

export interface RadioGroupProps {
  /** Nome do grupo — usado como atributo name nos inputs. */
  name: string;
  /** Valor atualmente selecionado. */
  value: string;
  /** Callback chamado ao selecionar um item. */
  onChange: (value: string) => void;
  children: ReactNode;
  /** Legenda do grupo, renderizada como <legend>. */
  label?: string;
  /** Mensagem de erro do grupo inteiro. */
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Radio.Group — agrupa RadioItems sob um mesmo fieldset semântico.
 *
 * Acessibilidade:
 * - Usa <fieldset> + <legend> para associar o rótulo ao grupo.
 * - `errorMessage` é conectado via aria-describedby em cada item.
 */
export function RadioGroup({
  name,
  value,
  onChange,
  children,
  label,
  errorMessage,
  disabled,
  className,
}: RadioGroupProps) {
  const errorId = errorMessage ? `${name}-error` : undefined;

  return (
    <RadioContext.Provider value={{ name, value, onChange, disabled, errorId }}>
      <fieldset className={cn("flex flex-col gap-2", className)} disabled={disabled}>
        {label && <legend className="mb-1 text-sm font-medium text-text">{label}</legend>}
        {children}
        {errorMessage && (
          <p id={errorId} className="text-sm text-danger" role="alert">
            {errorMessage}
          </p>
        )}
      </fieldset>
    </RadioContext.Provider>
  );
}

export interface RadioItemProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "name" | "checked" | "onChange"> {
  /** Rótulo visível do item. */
  label: string;
  /** Valor que este item representa. */
  value: string;
}

/**
 * Radio.Item — opção individual dentro de Radio.Group.
 *
 * Acessibilidade:
 * - Label associado via htmlFor/id.
 * - Herda name, estado disabled e errorId do contexto do grupo.
 */
export function RadioItem({ label, value, id, disabled, className, ...props }: RadioItemProps) {
  const ctx = useRadioContext();
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isDisabled = disabled ?? ctx.disabled;
  const isChecked = ctx.value === value;

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex h-4 w-4 shrink-0">
        <input
          type="radio"
          id={inputId}
          name={ctx.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          aria-describedby={ctx.errorId}
          onChange={() => ctx.onChange(value)}
          className={cn(radioInputVariants(), className)}
          {...props}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className={cn(
              "h-2 w-2 rounded-full bg-primary transition-transform",
              isChecked ? "scale-100" : "scale-0",
            )}
          />
        </div>
      </div>

      <label
        htmlFor={inputId}
        className={cn(
          "cursor-pointer select-none text-sm font-medium text-text",
          isDisabled && "cursor-not-allowed opacity-50",
        )}
      >
        {label}
      </label>
    </div>
  );
}

export const Radio = {
  Group: RadioGroup,
  Item: RadioItem,
};
