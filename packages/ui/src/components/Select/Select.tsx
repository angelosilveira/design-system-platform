import { useId, useRef, useState, type KeyboardEvent } from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import { cn } from "../../lib/cn";
import {
  selectTriggerVariants,
  type SelectTriggerVariants,
} from "./select.variants";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectTriggerVariants {
  label: string;
  options: SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
  disabled?: boolean;
}

/**
 * Select — combobox acessível construído sobre @floating-ui/react.
 *
 * Acessibilidade: role="combobox" no trigger, role="listbox" na lista,
 * navegação por teclado completa (setas, Home/End, Enter, Esc, typeahead).
 */

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  errorMessage,
  helperText,
  state,
  size: sizeVariant,
  disabled,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const listContentRef = useRef(options.map((option) => option.label));

  const labelId = useId();
  const descriptionId = useId();
  const listboxId = useId();
  const hasError = Boolean(errorMessage);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  const click = useClick(context, { event: "mousedown" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    onMatch: (index) => {
      if (isOpen) setActiveIndex(index);
      else onChange(options[index].value);
    },
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNav, typeahead],
  );

  const selectedOption = options.find((option) => option.value === value);

  function handleSelect(index: number) {
    onChange(options[index].value);
    setIsOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" && isOpen && activeIndex !== null) {
      event.preventDefault();
      handleSelect(activeIndex);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <label id={labelId} className="text-sm font-medium text-text">
        {label}
      </label>

      <button
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        ref={refs.setReference}
        type="button"
        disabled={disabled}
        aria-labelledby={labelId}
        aria-describedby={
          errorMessage || helperText ? descriptionId : undefined
        }
        aria-invalid={hasError || undefined}
        className={cn(
          selectTriggerVariants({
            state: hasError ? "error" : state,
            size: sizeVariant,
          }),
        )}
        {...getReferenceProps({ onKeyDown: handleKeyDown })}
      >
        <span className={cn(!selectedOption && "text-text-subtle")}>
          {selectedOption?.label ?? placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={cn("transition-transform", isOpen && "rotate-180")}
        >
          <path
            d="M4 6L8 10L12 6"
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
          id={listboxId}
          className="z-50 max-h-60 overflow-auto rounded-md border border-border bg-surface py-1 shadow-md"
          {...getFloatingProps()}
        >
          {options.map((option, index) => (
            <div
              key={option.value}
              ref={(node) => {
                listRef.current[index] = node;
              }}
              role="option"
              aria-selected={option.value === value}
              className={cn(
                "cursor-pointer px-3 py-2 text-md text-text",
                activeIndex === index && "bg-primary-subtle",
                option.value === value && "font-medium",
              )}
              {...getItemProps({
                onClick: () => handleSelect(index),
              })}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
