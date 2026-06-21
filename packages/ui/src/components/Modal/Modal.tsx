import {
  createContext,
  useContext,
  useEffect,
  useId,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/cn";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import {
  modalContentVariants,
  type ModalContentVariants,
} from "./modal.variants";

interface ModalContextValue {
  titleId: string;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "Modal.Header/Body/Footer devem ser usados dentro de <Modal.Root>",
    );
  }
  return context;
}

export interface ModalRootProps extends ModalContentVariants {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnBackdropClick?: boolean;
}

/**
 * Modal.Root — overlay modal acessível, renderizado via portal.
 *
 * Acessibilidade: role="dialog" + aria-modal="true" + aria-labelledby
 * apontando para o título. Focus trap via useFocusTrap, foco devolvido ao
 * elemento que abriu o modal ao fechar. Tecla Esc fecha o modal.
 */

export function ModalRoot({
  isOpen,
  onClose,
  children,
  size,
  closeOnBackdropClick = true,
}: ModalRootProps) {
  const titleId = useId();
  const containerRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <ModalContext.Provider value={{ titleId, onClose }}>
      {/*
        eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions --
        Backdrop do modal. O equivalente por teclado (Esc) já existe via useEffect acima.
      */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-surface-inverse/50 p-4"
        onClick={(event) => {
          if (closeOnBackdropClick && event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className={cn(modalContentVariants({ size }))}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body,
  );
}

export function ModalHeader({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { titleId, onClose } = useModalContext();

  return (
    <div
      className={cn("mb-4 flex items-start justify-between gap-4", className)}
      {...props}
    >
      <h2 id={titleId} className="text-xl font-semibold text-text">
        {children}
      </h2>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="rounded-md p-1 text-text-subtle hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 5L15 15M15 5L5 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

export function ModalBody({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-md text-text", className)} {...props}>
      {children}
    </div>
  );
}

export function ModalFooter({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-6 flex justify-end gap-2", className)} {...props}>
      {children}
    </div>
  );
}

export const Modal = {
  Root: ModalRoot,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
};
