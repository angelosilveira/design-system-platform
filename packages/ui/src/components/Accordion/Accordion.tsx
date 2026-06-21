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

export function AccordionRoot({ children, defaultOpen = "", className }: AccordionRootProps) {
  const [openItem, setOpenItem] = useState<string>(defaultOpen);

  function toggle(id: string) {
    setOpenItem((prev) => (prev === id ? "" : id));
  }

  return (
    <AccordionContext.Provider value={{ openItem, toggle }}>
      <div className={cn("overflow-hidden rounded-xl border border-border bg-surface shadow-sm", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  /** Identificador único do item — usado para controlar abertura. */
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  const { openItem } = useAccordionContext();
  const uid = useId();
  const triggerId = `accordion-trigger-${uid}`;
  const contentId = `accordion-content-${uid}`;
  const isOpen = openItem === value;

  return (
    <AccordionItemContext.Provider value={{ itemId: value, triggerId, contentId, isOpen }}>
      <div className={cn(accordionItemVariants(), isOpen && "bg-surface-subtle", className)}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

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
        className={cn(accordionTriggerVariants(), isOpen && "text-primary", className)}
        {...props}
      >
        <span>{children}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={cn(
            "shrink-0 text-text-subtle transition-all duration-300 ease-in-out",
            isOpen && "rotate-180 text-primary"
          )}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </h3>
  );
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function AccordionContent({ children, className, ...props }: AccordionContentProps) {
  const { triggerId, contentId, isOpen } = useAccordionItemContext();

  return (
    /*
     * CSS grid trick: grid-rows-[0fr] → grid-rows-[1fr] anima a altura sem
     * precisar medir o DOM. O inner div com overflow-hidden segura o conteúdo
     * enquanto o painel colapsa.
     */
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!isOpen}
      className={cn(
        "grid transition-[grid-template-rows] duration-300 ease-in-out",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
    >
      <div className="overflow-hidden">
        <div className={cn(accordionContentVariants(), className)} {...props}>
          {children}
        </div>
      </div>
    </div>
  );
}

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
