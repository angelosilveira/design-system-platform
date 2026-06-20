import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * useFocusTrap — prende o foco do teclado dentro do elemento enquanto
 * `isActive` for true, e devolve o foco para o elemento que estava focado
 * antes de abrir assim que `isActive` voltar a false.
 *
 * Usado pelo Modal (Bloco 2) e reutilizável por qualquer overlay futuro
 * (Select/DatePicker) que precise do mesmo comportamento.
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    const focusableElements =
      container?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    (firstElement ?? container)?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab" || !focusableElements?.length) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement.current?.focus();
    };
  }, [isActive]);

  return containerRef;
}
