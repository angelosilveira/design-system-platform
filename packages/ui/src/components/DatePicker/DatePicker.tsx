import { useId, useState } from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "../../lib/cn";
import { Calendar } from "./Calendar";
import {
  datePickerTriggerVariants,
  type DatePickerTriggerVariants,
} from "./datepicker.variants";

export interface DatePickerProps extends DatePickerTriggerVariants {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
  disabled?: boolean;
}

/**
 * DatePicker — seletor de data combinando um trigger acessível com um
 * calendário em popover.
 *
 * Acessibilidade: trigger se comporta como combobox (aria-haspopup="dialog",
 * aria-expanded). O popover tem role="dialog" e o foco é gerenciado pelo
 * componente Calendar assim que abre.
 */

export function DatePicker({
  label,
  value,
  onChange,
  placeholder = "Selecione uma data",
  errorMessage,
  helperText,
  state,
  size,
  disabled,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const labelId = useId();
  const descriptionId = useId();
  const hasError = Boolean(errorMessage);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    middleware: [offset(4), flip({ padding: 8 }), shift({ padding: 8 })],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <div className="flex flex-col gap-1">
      <label id={labelId} className="text-sm font-medium text-text">
        {label}
      </label>

      <button
        ref={refs.setReference}
        type="button"
        disabled={disabled}
        aria-labelledby={labelId}
        aria-describedby={
          errorMessage || helperText ? descriptionId : undefined
        }
        aria-invalid={hasError || undefined}
        aria-haspopup="dialog"
        className={cn(
          datePickerTriggerVariants({
            state: hasError ? "error" : state,
            size,
          }),
        )}
        {...getReferenceProps()}
      >
        <span className={cn(!value && "text-text-subtle")}>
          {value ? format(value, "PPP", { locale: ptBR }) : placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="2"
            y="3"
            width="12"
            height="11"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M2 6.5H14" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M5 1.5V4M11 1.5V4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

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

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="z-50 rounded-md border border-border bg-surface shadow-md"
          {...getFloatingProps()}
        >
          <Calendar
            selectedDate={value}
            onSelectDate={onChange}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
