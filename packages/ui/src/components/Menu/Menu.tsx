import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import { menuContentVariants, menuItemVariants, type MenuContentVariants } from "./menu.variants";

interface MenuContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerId: string;
  contentId: string;
}

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuContext() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("Menu.Trigger/Content deve ser usado dentro de <Menu.Root>");
  return ctx;
}

export interface MenuRootProps {
  children: ReactNode;
  className?: string;
}

/**
 * Menu — dropdown de ações com navegação por teclado.
 *
 * Acessibilidade:
 * - Trigger usa aria-haspopup="menu" e aria-expanded.
 * - Content usa role="menu", aria-labelledby apontando para o trigger.
 * - Items usam role="menuitem".
 * - Esc fecha o menu e devolve foco ao trigger.
 * - ↑↓ navegam entre itens dentro do menu.
 */
export function MenuRoot({ children, className }: MenuRootProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uid = useId();
  const triggerId = `menu-trigger-${uid}`;
  const contentId = `menu-content-${uid}`;
  const containerRef = useRef<HTMLDivElement>(null);

  function open() { setIsOpen(true); }
  function close() { setIsOpen(false); }

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        const trigger = containerRef.current?.querySelector<HTMLElement>(`#${CSS.escape(triggerId)}`);
        trigger?.focus();
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, triggerId]);

  return (
    <MenuContext.Provider value={{ isOpen, open, close, triggerId, contentId }}>
      <div ref={containerRef} className={cn("relative inline-block", className)}>
        {children}
      </div>
    </MenuContext.Provider>
  );
}

export interface MenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Menu.Trigger — botão que abre/fecha o menu dropdown. */
export function MenuTrigger({ children, className, ...props }: MenuTriggerProps) {
  const { isOpen, open, close, triggerId, contentId } = useMenuContext();

  return (
    <button
      id={triggerId}
      type="button"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={isOpen ? contentId : undefined}
      onClick={() => (isOpen ? close() : open())}
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text transition-colors " +
          "hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface MenuContentProps extends HTMLAttributes<HTMLDivElement>, MenuContentVariants {
  children: ReactNode;
}

/** Menu.Content — painel dropdown posicionado abaixo do trigger. */
export function MenuContent({ children, className, align, ...props }: MenuContentProps) {
  const { isOpen, contentId, triggerId } = useMenuContext();

  if (!isOpen) return null;

  return (
    <div
      id={contentId}
      role="menu"
      aria-labelledby={triggerId}
      className={cn(menuContentVariants({ align }), "top-full mt-1", className)}
      {...props}
    >
      <div className="py-1">{children}</div>
    </div>
  );
}

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Menu.Item — item clicável dentro do menu. */
export function MenuItem({ children, className, onClick, ...props }: MenuItemProps) {
  const { close } = useMenuContext();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    close();
  }

  return (
    <button
      role="menuitem"
      type="button"
      className={cn(menuItemVariants(), className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export interface MenuSeparatorProps extends HTMLAttributes<HTMLHRElement> {}

/** Menu.Separator — divisor visual entre grupos de items. */
export function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return <hr role="separator" className={cn("my-1 border-border", className)} {...props} />;
}

export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  Separator: MenuSeparator,
};
