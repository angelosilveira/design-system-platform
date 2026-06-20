import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/cn";
import { snackbarVariants, type SnackbarVariants } from "./snackbar.variants";

interface SnackbarItem extends SnackbarVariants {
  id: string;
  message: string;
  duration: number;
}

interface ShowSnackbarOptions extends SnackbarVariants {
  duration?: number;
}

interface SnackbarContextValue {
  showSnackbar: (message: string, options?: ShowSnackbarOptions) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

/**
 * SnackbarProvider — gerencia a fila de notificações e renderiza a
 * viewport via portal.
 *
 * Acessibilidade: aria-live="polite" + role="status" na viewport, anuncia
 * cada notificação sem interromper o usuário. Botão de fechar focável.
 */

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar deve ser usado dentro de <SnackbarProvider>");
  }
  return context;
}

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SnackbarItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeSnackbar = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const showSnackbar = useCallback(
    (message: string, options?: ShowSnackbarOptions) => {
      const id = crypto.randomUUID();
      const duration = options?.duration ?? 5000;

      setItems((current) => [
        ...current,
        { id, message, duration, variant: options?.variant },
      ]);

      const timer = setTimeout(() => removeSnackbar(id), duration);
      timers.current.set(id, timer);
    },
    [removeSnackbar],
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {createPortal(
        <div
          aria-live="polite"
          role="status"
          className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(snackbarVariants({ variant: item.variant }))}
            >
              <p className="flex-1 text-sm">{item.message}</p>
              <button
                type="button"
                onClick={() => removeSnackbar(item.id)}
                aria-label="Fechar notificação"
                className="rounded p-0.5 text-text-subtle hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 4L12 12M12 4L4 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>,
        document.body,
      )}
    </SnackbarContext.Provider>
  );
}
