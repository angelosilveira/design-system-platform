import {
  createContext,
  useContext,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import {
  accordionContentVariants,
  accordionItemVariants,
  accordionTriggerVariants,
} from "./accordion.variants";

interface AccordionContextValue {
  openItem: string | null;
  toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion.Item deve ser usado dentro de <Accordion.Root>");
  return ctx;
}

interface AccordionItemContextValue {
  itemId: string;
  triggerId: string;
  contentId: string;
  isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) throw new Error("Accordion.Trigger/Content deve ser usado dentro de <Accordion.Item>");
  return ctx;
}

export interface AccordionRootProps {
  children: ReactNode;
  /** Item aberto por padrão (valor deve corresponder à prop `value` do Item). */
  defaultOpen?: string;
  className?: string;
}

/**
 * Accordion.Root — contêiner que gerencia o item aberto do acordeão.
 *
 * Acessibilidade:
 * - Apenas um item pode estar aberto por vez.
 * - Trigger usa aria-expanded e aria-controls apontando para o painel.
 * - Painel usa role="region" e aria-labelledby apontando para o trigger.
 */
export function AccordionRoot({ children, defaultOpen = "", className }: AccordionRootProps) {
  const [openItem, setOpenItem] = useState<string>(defaultOpen);

  function toggle(id: string) {
    setOpenItem((prev) => (prev === id ? "" : id));
  }

  return (
    <AccordionContext.Provider value={{ openItem, toggle }}>
      <div className={cn("rounded-md border border-border", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  /** Identificador único do item — usado para controlar abertura. */
  value: string;
  children: ReactNode;
  className?: string;
}

/** Accordion.Item — agrupa Trigger e Content de um único item. */
export function AccordionItem({ value, children, className }: AccordionItemProps) {
  const { openItem } = useAccordionContext();
  const uid = useId();
  const triggerId = `accordion-trigger-${uid}`;
  const contentId = `accordion-content-${uid}`;
  const isOpen = openItem === value;

  return (
    <AccordionItemContext.Provider value={{ itemId: value, triggerId, contentId, isOpen }}>
      <div className={cn(accordionItemVariants(), className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Accordion.Trigger — botão que abre/fecha o painel associado. */
export function AccordionTrigger({ children, className, ...props }: AccordionTriggerProps) {
  const { toggle } = useAccordionContext();
  const { itemId, triggerId, contentId, isOpen } = useAccordionItemContext();

  return (
    <h3 className="flex">
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => toggle(itemId)}
        className={cn(accordionTriggerVariants(), className)}
        {...props}
      >
        {children}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={cn("shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </h3>
  );
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Accordion.Content — painel de conteúdo exibido quando o item está aberto. */
export function AccordionContent({ children, className, ...props }: AccordionContentProps) {
  const { triggerId, contentId, isOpen } = useAccordionItemContext();

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      hidden={!isOpen}
      className={cn(accordionContentVariants(), isOpen ? "pb-4" : "h-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
