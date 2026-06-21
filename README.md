# Design System Platform

🔗 **[Storybook ao vivo](https://design-system-platform-storybook.vercel.app)** · API rodando em produção (Railway)

> Um Design System construído do zero — com acessibilidade real, IA aplicada ao
> fluxo de desenvolvimento, e governança como produto.

Projeto de portfólio construído para um processo seletivo focado em Design
System. Em vez de mais uma biblioteca de componentes genérica, o objetivo aqui
foi demonstrar a interseção entre **Design System + Produto + IA**: componentes
acessíveis construídos do zero, um assistente de IA que responde perguntas
sobre a documentação real (RAG), e um dashboard de saúde com métricas
calculadas a partir do código de verdade — nada de dado mockado.

## ✨ O que tem aqui

| Feature | Status | Onde está |
| --- | --- | --- |
| **22 componentes acessíveis** (Button, Input, Modal, Select, Card, Snackbar, DatePicker, Table, Checkbox, Radio, Textarea, Badge, Icon, Typography, Alert, Skeleton, Accordion, Link, Menu, Pagination, Tabs, Breadcrumb) | ✅ Implementado | `packages/ui` |
| Design tokens centralizados | ✅ Implementado | `packages/tokens` |
| **Sistema de temas** (light, dark, brand) via CSS custom properties | ✅ Implementado | `packages/tokens/src/themes` |
| **CSS Transformer** — gera `:root` com custom properties a partir dos tokens | ✅ Implementado | `packages/tokens/src/transformers` |
| Storybook documentado, com addon de acessibilidade e theme switcher | ✅ Implementado | `apps/storybook` |
| **102 testes unitários** (Vitest + Testing Library) | ✅ Implementado | `packages/ui/src/**/*.test.tsx` |
| **Stories de composição** — formulário completo, tabela paginada | ✅ Implementado | `apps/storybook/src/examples` |
| **Storybook Intelligence** — chat com RAG sobre a documentação real | ✅ Implementado | `apps/api` + `apps/storybook/src/intelligence` |
| **Health Dashboard** — métricas reais de cobertura/documentação | ✅ Implementado | `apps/storybook/src/dashboard` |
| Accessibility Auditor com IA | 📐 Arquitetado | `packages/a11y-auditor` |

Ver [`ROADMAP.md`](./ROADMAP.md) e [`CHANGELOG.md`](./CHANGELOG.md).

## 🧩 Os 22 componentes

### Fase 1 — Componentes Core
Construídos com foco em ARIA patterns avançados, sem dependências de UI headless:

| Componente | ARIA pattern | Destaques |
| --- | --- | --- |
| **Button** | `aria-busy`, `aria-disabled` | isLoading state, ref forwarding |
| **Input** | `aria-invalid`, `aria-describedby` | label obrigatório, useId |
| **Modal** | `role="dialog"`, `aria-modal` | focus trap próprio, portal, Esc |
| **Select** | combobox ARIA completo | typeahead, roving tabindex, @floating-ui |
| **DatePicker** | `role="grid"`, `aria-grid` | calendar com ←↑→↓, pt-BR, date-fns |
| **Table** | `aria-sort`, `scope="col"` | ordenação, caption sr-only |
| **Card** | compound component | Card.Root/Header/Body/Footer |
| **Snackbar** | `aria-live="polite"` | queue de notificações, auto-dismiss |

### Fase 2 — Expansão da Biblioteca
14 componentes adicionados preservando os mesmos padrões de acessibilidade:

| Componente | ARIA pattern | Destaques |
| --- | --- | --- |
| **Checkbox** | `aria-invalid`, indeterminate DOM prop | label obrigatório, ref forwarding |
| **Radio** | `fieldset`/`legend` | RadioGroup + RadioItem, contexto compartilhado |
| **Textarea** | `aria-invalid`, `aria-describedby` | idêntico ao Input, resize |
| **Badge** | span inline | 5 variantes semânticas |
| **Icon** | `aria-hidden` por padrão | 17 ícones SVG, size prop |
| **Typography** | polimórfico (`as` prop) | Heading/Text/Caption, nível semântico |
| **Alert** | `role="alert"` | dismissível, 4 variantes |
| **Skeleton** | `aria-hidden="true"` | 3 shapes, width/height props |
| **Accordion** | `aria-expanded`, `aria-controls` | compound, single-open |
| **Link** | `rel="noopener noreferrer"` | links externos com sr-only |
| **Menu** | `role="menu"`, `aria-haspopup` | Esc fecha, click-outside |
| **Pagination** | `aria-current="page"` | ellipsis automático |
| **Tabs** | `role="tablist"`, roving tabindex | ←→ Home/End nos triggers |
| **Breadcrumb** | `nav aria-label`, `aria-current="page"` | compound, separadores aria-hidden |

## 🎨 Sistema de temas

Os tokens TypeScript alimentam um CSS Transformer que gera custom properties,
permitindo troca de tema em runtime sem reconstrução:

```bash
# Gera os arquivos CSS de cada tema
pnpm --filter @design-system/tokens generate
```

Temas disponíveis: **light** (padrão), **dark**, **brand**.
O Storybook inclui um theme switcher global para demonstrar a troca em tempo real.

## 🧠 Storybook Intelligence — o diferencial

Um copilot que responde perguntas sobre os componentes consultando a
documentação **real** do projeto via RAG (Retrieval Augmented Generation):

```
Pergunta do usuário
→ embedding da pergunta (OpenAI text-embedding-3-small)
→ busca por similaridade no pgvector (Supabase) — TOP 4 matches
→ contexto real recuperado (props, descrição, exemplo de uso)
→ resposta gerada com gpt-4o-mini com base nesse contexto
```

Pergunte algo como _"Como uso o DatePicker com React Hook Form?"_ e a resposta
vem com um exemplo de código baseado no componente real do repositório — não
uma resposta genérica de LLM.

## 📊 Health Dashboard — governança como produto

Todas as métricas (cobertura de documentação, de testes, de descrição JSDoc)
são calculadas lendo o código real do repositório a cada execução de
`pnpm metrics` — sem números inventados.

**Estado atual** (atualizado automaticamente):
- **22 componentes** com 100% de stories, testes e JSDoc
- **102 testes unitários** cobrindo rendering, interação e comportamento ARIA

```bash
cd apps/storybook && pnpm metrics
```

## 🏗️ Stack

- **Frontend**: React 18 + TypeScript 5 + Tailwind CSS + `class-variance-authority`
- **Monorepo**: Turborepo + pnpm workspaces
- **Documentação**: Storybook 8 (Vite builder, addon-a11y, addon-interactions, theme switcher)
- **Testes**: Vitest + Testing Library + Storybook Test Runner
- **IA / RAG**: OpenAI (embeddings + chat) + pgvector (Supabase)
- **API**: Node + Fastify
- **Componentes construídos do zero** (sem Radix/MUI) — decisão deliberada
  para demonstrar implementação direta de padrões de acessibilidade
  (focus trap, roving tabindex, combobox ARIA), com `@floating-ui/react`
  usado apenas para cálculo de posicionamento de overlays (Select, DatePicker).

## 📁 Estrutura do monorepo

```
apps/
  api/        → API Fastify — RAG (extract, embed, ask)
  storybook/  → Storybook, ChatWidget, Health Dashboard, examples
packages/
  ui/         → 22 componentes do Design System
  tokens/     → Design tokens + CSS Transformer + temas
  a11y-auditor/ → Contrato do futuro Accessibility Auditor (Fase 3)
  config/     → tsconfig compartilhado
```

## 🚀 Como rodar localmente

### Pré-requisitos

- Node 18+
- pnpm (`npm install -g pnpm`)
- Conta na [OpenAI](https://platform.openai.com) (para o chat RAG) — opcional
- Conta no [Supabase](https://supabase.com) (banco com pgvector) — opcional

### 1. Instalar e validar

```bash
pnpm install
pnpm build
pnpm test
```

### 2. Rodar o Storybook

```bash
cd apps/storybook
pnpm metrics   # atualiza o Health Dashboard
pnpm storybook # abre em http://localhost:6006
```

### 3. (Opcional) Storybook Intelligence com RAG

Crie `apps/api/.env` a partir de `apps/api/.env.example`:
```
DATABASE_URL=<connection string do pooler do Supabase>
OPENAI_API_KEY=<sua chave da OpenAI>
PORT=3333
```

```bash
cd apps/api
pnpm db:migrate
pnpm extract   # extrai documentação dos componentes
pnpm embed     # gera embeddings no pgvector
pnpm dev
```

## 🧪 Testes

```bash
# Testes unitários (102 testes, 22 componentes)
pnpm --filter @design-system/ui test

# Storybook Test Runner (smoke tests de todas as stories)
cd apps/storybook && pnpm storybook &
pnpm test-storybook
```

## 🔍 Decisões de arquitetura

- **Componentes do zero vs. biblioteca headless**: trade-off consciente entre
  controle total e velocidade — ver [`CONTRIBUTING.md`](./CONTRIBUTING.md) para
  como cada padrão ARIA foi escolhido.
- **Tokens como TypeScript puro**: permite type-safety, tree-shaking e geração
  de CSS/Android/iOS a partir da mesma fonte de verdade.
- **Temas via CSS custom properties**: troca em runtime sem reconstrução,
  suporte a `prefers-color-scheme` automático no tema dark.
- **RAG enxuto, sem reranking**: pipeline simples e correto a um complexo e frágil.
- **Bug real de índice `ivfflat`** encontrado e documentado: o índice criado
  em tabela vazia causava buscas retornando zero resultados. Ver comentário em
  `apps/api/src/scripts/migrate.ts`.
- **Métricas nunca mockadas**: derivadas do código-fonte em tempo de execução.
