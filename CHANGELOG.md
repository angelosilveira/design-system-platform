# Changelog

Todas as mudanças notáveis neste projeto são documentadas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [Unreleased]

### Planejado
- Accessibility Auditor com IA (Fase 3)
- Transformer Android (Kotlin color objects)
- Transformer iOS (Swift color constants)
- Streaming nas respostas do Storybook Intelligence

---

## [0.3.0] — 2026-06-21

### Adicionado
- **Sistema de temas** (light, dark, brand) via CSS custom properties (`packages/tokens/src/themes/`)
- **CSS Transformer** — `generateThemeCss()` gera blocos `:root` e `[data-theme]` a partir dos tokens TypeScript (`packages/tokens/src/transformers/css-transformer.ts`)
- Script `pnpm --filter @design-system/tokens generate` — gera `packages/tokens/dist/themes.css`
- **ThemeProvider** — componente React que troca o `data-theme` no `<html>` em runtime (`packages/ui/src/components/ThemeProvider/`)
- **Toolbar de temas no Storybook** — seleciona light/dark/brand sem recarregar a página (`.storybook/preview.tsx`)
- **Story: Formulário Completo** — composição de Typography, Input, Select, Textarea, Radio, Checkbox, Button, Alert, Badge com validação real (`apps/storybook/src/examples/`)
- **Story: Tabela Paginada** — composição de Table, Pagination, Badge, Input com 47 registros, busca e ordenação por coluna

### Alterado
- `packages/ui/tailwind.config.ts` — cores migradas de hex literal para `var(--ds-color-*)`, habilitando troca de tema sem rebuild
- `packages/tokens/src/transformers/types.ts` — `TokenTransformer` marcado como implementado (não mais "futuro")
- `.storybook/tailwind.css` — inclui os três temas como CSS custom properties; `body` usa as variáveis de cor
- README atualizado para refletir 22 componentes, 102 testes, sistema de temas e stories de composição

---

## [0.2.0] — 2026-06-20

### Adicionado
- 14 novos componentes: **Checkbox**, **Radio**, **Textarea**, **Badge**, **Icon**, **Typography**, **Alert**, **Skeleton**, **Accordion**, **Link**, **Menu**, **Pagination**, **Tabs**, **Breadcrumb**
- Cada componente inclui `.tsx`, `.variants.ts`, `.test.tsx`, `.stories.tsx`, `index.ts`
- Compound components com Context API: Accordion, Tabs, Menu, Breadcrumb, Radio
- Roving tabindex em Tabs (←→ Home/End gerenciados nos triggers)
- Factory de ícones SVG com `createIcon()` — 17 ícones inclusos
- `packages/ui/src/index.ts` expandido para exportar todos os 22 componentes

### Corrigido
- `Checkbox.tsx` — dual-ref pattern para suportar `indeterminate` DOM property com `forwardRef`
- Stories com `useState` em `render:` extraídas para componentes nomeados (ESLint `react-hooks/rules-of-hooks`)
- `BreadcrumbSeparatorProps` migrado de `interface` vazia para `type alias` (ESLint `@typescript-eslint/no-empty-object-type`)
- `Menu.Separator` — `role="separator"` explícito removido (implícito em `<hr>`)
- `Tabs.List` — `onKeyDown` movido para `Tabs.Trigger` (ESLint `jsx-a11y/interactive-supports-focus`)

---

## [0.1.0] — 2026-05-15

### Adicionado
- Monorepo Turborepo + pnpm workspaces
- **8 componentes core**: Button, Input, Modal, Select, Card, Snackbar, DatePicker, Table
  - Focus trap próprio no Modal (`useFocusTrap`)
  - Combobox ARIA completo no Select (typeahead, roving tabindex)
  - Calendar com navegação ←↑→↓ no DatePicker (date-fns, pt-BR)
  - `aria-sort` e `scope="col"` na Table
  - `aria-live="polite"` + queue de notificações no Snackbar
- Design tokens em TypeScript puro (`packages/tokens`)
- Storybook 8 com addon-a11y, addon-interactions, autodocs
- 35 testes unitários (Vitest + Testing Library)
- **Storybook Intelligence** — chat RAG com OpenAI + pgvector (Supabase)
  - Pipeline: extract → embed → similarity search → gpt-4o-mini
  - Bug documentado: índice `ivfflat` em tabela vazia causa buscas retornando vazio
- **Health Dashboard** — métricas reais calculadas do código-fonte (`generate-metrics.ts`)
- `packages/a11y-auditor` — contrato de tipos do futuro Accessibility Auditor
