# Contribuindo com o Design System

Guia para adicionar novos componentes, corrigir bugs e evoluir o projeto.

## Estrutura de um componente

Cada componente em `packages/ui/src/components/` segue esta estrutura:

```
ComponentName/
  ComponentName.tsx          # Implementação principal
  component-name.variants.ts # Variantes CVA
  ComponentName.test.tsx     # Testes unitários
  ComponentName.stories.tsx  # Documentação Storybook
  index.ts                   # Re-exportação pública
```

---

## Passo a passo para adicionar um componente

### 1. Criar os arquivos

```bash
mkdir packages/ui/src/components/MyComponent
```

### 2. Definir as variantes (`.variants.ts`)

Use `class-variance-authority`:

```ts
import { cva, type VariantProps } from "class-variance-authority";

export const myComponentVariants = cva(
  "base-classes-aqui",
  {
    variants: {
      variant: {
        default: "...",
        primary: "...",
      },
      size: {
        sm: "...",
        md: "...",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type MyComponentVariants = VariantProps<typeof myComponentVariants>;
```

### 3. Implementar o componente (`.tsx`)

Regras obrigatórias:

**a) JSDoc com ARIA pattern documentado**
```tsx
/**
 * MyComponent — descrição em uma linha.
 *
 * Acessibilidade:
 * - Descreva os atributos ARIA usados.
 * - Explique o comportamento de teclado se houver.
 */
```

**b) `forwardRef` em todos os elementos focusáveis/de formulário**
```tsx
export const MyComponent = forwardRef<HTMLButtonElement, MyComponentProps>(
  function MyComponent({ className, variant, size, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(myComponentVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
MyComponent.displayName = "MyComponent";
```

**c) Compound components quando houver composição (Context API)**
```tsx
const MyContext = createContext<MyContextValue | null>(null);

function useMyContext() {
  const ctx = useContext(MyContext);
  if (!ctx) throw new Error("MyComponent.Child deve ser usado dentro de <MyComponent.Root>");
  return ctx;
}

export const MyComponent = {
  Root: MyComponentRoot,
  Header: MyComponentHeader,
  Body: MyComponentBody,
};
```

**d) Sempre usar tokens via Tailwind**

Nunca hardcode cores ou espaçamentos. Use as classes Tailwind que mapeiam para os tokens:

```tsx
// ✅ Correto
<div className="bg-surface text-text border border-border rounded-md p-4">

// ❌ Errado
<div style={{ backgroundColor: "#FFFFFF", color: "#172B4D" }}>
```

### 4. Escrever os testes (`.test.tsx`)

Mínimo esperado:
- Renderização básica
- Props de acessibilidade (role, aria-label, aria-*)
- Interação principal (click, keydown se aplicável)
- Estado de erro (se houver)

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("renderiza com role correto", () => {
    render(<MyComponent>Texto</MyComponent>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("dispara onClick ao pressionar Enter", async () => {
    const onClick = vi.fn();
    render(<MyComponent onClick={onClick}>Texto</MyComponent>);
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalled();
  });
});
```

### 5. Documentar no Storybook (`.stories.tsx`)

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./MyComponent";

const meta: Meta<typeof MyComponent> = {
  title: "Components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Descrição do componente para o autodocs.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = { args: { children: "Exemplo" } };
```

Se precisar de `useState` na story, extraia para um componente nomeado:

```tsx
// ✅ Correto
function ControlledExample() {
  const [value, setValue] = useState("");
  return <MyComponent value={value} onChange={(v) => setValue(v)} />;
}
export const Controlled: Story = { render: () => <ControlledExample /> };

// ❌ Causa ESLint react-hooks/rules-of-hooks
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(""); // erro!
    return <MyComponent value={value} />;
  },
};
```

### 6. Exportar no `index.ts` do componente

```ts
export { MyComponent } from "./MyComponent";
export type { MyComponentProps } from "./MyComponent";
```

### 7. Adicionar ao `packages/ui/src/index.ts`

```ts
export * from "./components/MyComponent";
```

### 8. Atualizar as métricas

```bash
cd apps/storybook
pnpm metrics
```

---

## Padrões de acessibilidade

| Componente | Pattern ARIA |
|---|---|
| Botão de ação | `<button type="button">` — nunca `<div onClick>` |
| Link externo | `rel="noopener noreferrer"` + texto sr-only "(abre em nova aba)" |
| Campo de formulário | `aria-invalid`, `aria-describedby` apontando para a mensagem de erro |
| Dialog / Modal | `role="dialog"`, `aria-modal="true"`, focus trap, fecha com Esc |
| Dropdown / Combobox | `aria-expanded`, `aria-controls`, `aria-haspopup` |
| Tabs | `role="tablist/tab/tabpanel"`, `aria-selected`, roving tabindex |
| Menu | `role="menu/menuitem"`, fecha com Esc, devolve foco ao trigger |
| Loading/Skeleton | `aria-hidden="true"` no placeholder; `aria-busy` no contêiner |
| Notificação | `aria-live="polite"` ou `role="alert"` para urgente |

## Convenções de nomenclatura

- Props booleanas: `isLoading`, `isDisabled`, `isOpen` — ou simplesmente `disabled`, `open` quando idiomático em HTML
- Callbacks: `onSomething` — nunca `handleSomething` como prop pública
- Variante semântica: `variant: "primary" | "danger" | "success"` — nunca `variant: "red" | "green"`
- Composição: `Component.Root`, `Component.Header`, `Component.Body` — namespace do componente pai

## Executando os testes

```bash
# Unitários
pnpm --filter @design-system/ui test

# Watch mode
pnpm --filter @design-system/ui test --watch

# Storybook test runner (requer Storybook rodando)
cd apps/storybook && pnpm storybook &
pnpm test-storybook
```
