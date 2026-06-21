import {
  createContext,
  useContext,
  useId,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import { tabsListVariants, tabsTriggerVariants } from "./tabs.variants";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  registerTab: (id: string) => void;
  tabs: string[];
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.List/Trigger/Content deve ser usado dentro de <Tabs.Root>");
  return ctx;
}

export interface TabsRootProps {
  /** Tab ativa por padrão. */
  defaultTab: string;
  children: ReactNode;
  className?: string;
}

/**
 * Tabs.Root — gerencia o estado de tab ativa e expõe contexto para filhos.
 *
 * Acessibilidade:
 * - Tabs.List tem role="tablist".
 * - Tabs.Trigger tem role="tab", aria-selected, aria-controls.
 * - Tabs.Content tem role="tabpanel", aria-labelledby.
 * - Navegação com ←→ (roving tabindex) + Home/End tratados em cada trigger.
 */
export function TabsRoot({ defaultTab, children, className }: TabsRootProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [tabs, setTabs] = useState<string[]>([]);
  const baseId = useId();

  function registerTab(id: string) {
    setTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, registerTab, tabs, baseId }}>
      <div className={cn("flex flex-col gap-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Tabs.List — contêiner da lista de tabs. A navegação por teclado é gerenciada em cada Trigger. */
export function TabsList({ children, className, ...props }: TabsListProps) {
  return (
    <div role="tablist" className={cn(tabsListVariants(), className)} {...props}>
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /** Valor que identifica esta tab — deve corresponder ao `value` do Content. */
  value: string;
  children: ReactNode;
}

/**
 * Tabs.Trigger — botão de seleção de uma tab.
 *
 * Acessibilidade:
 * - Keyboard: ← → movem o foco entre tabs (roving tabindex).
 * - Home/End saltam para a primeira/última tab.
 * - O handler fica no <button> (naturalmente focusável), não no container.
 */
export function TabsTrigger({ value, children, className, onKeyDown, ...props }: TabsTriggerProps) {
  const { activeTab, setActiveTab, registerTab, tabs, baseId } = useTabsContext();
  const isActive = activeTab === value;

  registerTab(value);

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = tabs.indexOf(value);
    let nextIndex = currentIndex;

    if (e.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    else if (e.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = tabs.length - 1;
    else {
      onKeyDown?.(e);
      return;
    }

    e.preventDefault();
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab);
    document.getElementById(`${baseId}-tab-${nextTab}`)?.focus();
  }

  return (
    <button
      id={`${baseId}-tab-${value}`}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActiveTab(value)}
      onKeyDown={handleKeyDown}
      className={cn(tabsTriggerVariants({ active: isActive }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Valor que identifica este painel — deve corresponder ao `value` do Trigger. */
  value: string;
  children: ReactNode;
}

/** Tabs.Content — painel de conteúdo associado a uma tab. */
export function TabsContent({ value, children, className, ...props }: TabsContentProps) {
  const { activeTab, baseId } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <div
      id={`${baseId}-panel-${value}`}
      role="tabpanel"
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={!isActive}
      tabIndex={0}
      className={cn(
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
