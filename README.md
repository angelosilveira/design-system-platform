# Design System Platform

**[Storybook ao vivo](https://design-system-platform-storybook.vercel.app)** · API rodando em produção (Railway)

> Design System construído do zero — acessibilidade real, tokens multi-plataforma, IA integrada ao fluxo de desenvolvimento e governança como produto.

---

## Por que este projeto é diferente

A maioria dos portfólios de Design System entrega uma biblioteca de componentes com Radix ou shadcn/ui. Este projeto faz escolhas deliberadamente mais difíceis:

- **Componentes sem biblioteca headless** — focus trap, roving tabindex e combobox ARIA implementados à mão para demonstrar compreensão real dos padrões
- **Tokens como fonte única de verdade para 5 plataformas** — um `pnpm generate` produz CSS vars, Android XML, Swift, Dart e TypeScript a partir do mesmo arquivo TypeScript
- **IA no workflow de desenvolvimento**, não só no produto — um assistente com RAG que responde sobre os componentes reais do repositório
- **Métricas nunca mockadas** — o Health Dashboard lê o código-fonte em tempo de execução

---

## Visão geral

```
┌──────────────────────────────────────────────────────────────┐
│                     Design System Platform                   │
├─────────────────┬────────────────────┬───────────────────────┤
│   packages/ui   │  packages/tokens   │      apps/storybook   │
│  22 componentes │  Tokens + Temas +  │  Documentação + Chat  │
│  102 testes     │  Style Dictionary  │  Dashboard + Examples │
│  ARIA patterns  │  5 plataformas     │  90 a11y tests        │
└─────────────────┴────────────────────┴───────────────────────┘
```

---

## Funcionalidades

| # | Feature | Detalhes |
|---|---------|----------|
| 1 | **22 componentes acessíveis** | Sem Radix/MUI — ARIA implementado do zero |
| 2 | **Tokens multi-plataforma** | CSS · Android · iOS (Swift) · Flutter · React Native |
| 3 | **Sistema de temas** | Light / Dark / Brand com CSS custom properties |
| 4 | **102 testes unitários** | Vitest + Testing Library + 90 Storybook a11y tests |
| 5 | **Storybook Intelligence** | Chat com RAG sobre a documentação real |
| 6 | **Health Dashboard** | Métricas de cobertura calculadas do código real |
| 7 | **CI/CD completo** | GitHub Actions + Lighthouse + artefato do Storybook |
| 8 | **Developer workflow** | Husky + commitlint + Conventional Commits |

---

## Os 22 componentes

Todos construídos com `forwardRef`, CVA (class-variance-authority) e padrões ARIA sem dependências de UI headless. `@floating-ui/react` é usado exclusivamente para cálculo de posicionamento em overlays.

### Fase 1 — Core

| Componente | ARIA pattern | Destaques técnicos |
|---|---|---|
| **Button** | `aria-busy`, `aria-disabled` | estado loading, ref forwarding |
| **Input** | `aria-invalid`, `aria-describedby` | `useId` para associação label/campo |
| **Modal** | `role="dialog"`, `aria-modal` | focus trap próprio, portal, Esc |
| **Select** | combobox pattern completo | typeahead, roving tabindex, `@floating-ui` |
| **DatePicker** | `role="grid"`, navegação por setas | pt-BR, `date-fns`, ←↑→↓ Home/End |
| **Table** | `aria-sort`, `scope="col"` | ordenação, caption acessível |
| **Card** | compound component | `Card.Root / Header / Body / Footer` |
| **Snackbar** | `aria-live="polite"` | queue de notificações, auto-dismiss |

### Fase 2 — Expansão

| Componente | ARIA pattern | Destaques técnicos |
|---|---|---|
| **Checkbox** | `aria-invalid`, `indeterminate` | prop DOM direta, ref forwarding |
| **Radio** | `fieldset` / `legend` | `RadioGroup + RadioItem`, contexto compartilhado |
| **Textarea** | `aria-invalid`, `aria-describedby` | resize, mesma API do Input |
| **Badge** | span semântico | 5 variantes com contraste WCAG AA |
| **Typography** | polimórfico (`as` prop) | `Heading / Text / Caption`, nível semântico |
| **Alert** | `role="alert"` | dismissível, 4 variantes |
| **Skeleton** | `aria-hidden="true"` | 3 shapes, animação de pulso |
| **Accordion** | `aria-expanded`, `aria-controls` | animação CSS grid (sem medir DOM) |
| **Link** | `rel="noopener noreferrer"` | aviso sr-only em links externos |
| **Menu** | `role="menu"`, `aria-haspopup` | Esc fecha, click-outside |
| **Pagination** | `aria-current="page"` | ellipsis automático |
| **Tabs** | `role="tablist"`, roving tabindex | ←→ Home/End nos triggers |
| **Breadcrumb** | `nav aria-label`, `aria-current="page"` | separadores `aria-hidden` |
| **Icon** | `aria-hidden` por padrão | 17 ícones SVG inline |

---

## Tokens multi-plataforma

O maior diferencial técnico do projeto. Os tokens são definidos uma única vez em TypeScript e um adapter os converte para o formato do [Style Dictionary](https://amzn.github.io/style-dictionary/), que gera os arquivos para cada plataforma.

```
packages/tokens/src/themes/light.ts   ← fonte única de verdade
              └── sd-adapter.ts       ← converte ThemeColors → Style Dictionary format
                       └── generate-platforms.ts
                                │
                ┌───────────────┼────────────────┬──────────────────┐
                ▼               ▼                ▼                  ▼
         colors.xml       Colors.swift      tokens.dart         tokens.ts
         (Android)          (iOS)           (Flutter)        (React Native)
```

**Um comando, 12 arquivos** (3 temas × 4 plataformas):

```bash
pnpm --filter @design-system/tokens generate:all
```

**Exemplo de output por plataforma:**

```xml
<!-- Android: dist/android/dark/colors.xml -->
<color name="color_primary_default">#ff4c9aff</color>
```

```swift
// iOS: dist/ios/dark/Colors.swift
public enum DSDarkColors {
    public static let colorPrimaryDefault = UIColor(red: 0.298, green: 0.604, blue: 1.000, alpha: 1)
}
```

```dart
// Flutter: dist/flutter/brand/tokens.dart
class DSBrandTokens {
    static const colorPrimaryDefault = Color(0xFF00875A);
}
```

```ts
// React Native: dist/react-native/light/tokens.ts
export const colorPrimaryDefault = "#0052cc";
```

---

## Sistema de temas

Três temas (light, dark, brand) implementados com CSS custom properties. A troca acontece em runtime sem rebuild — basta setar `data-theme` no `<html>`.

```
tokens/src/themes/*.ts
       │
       ├── generateThemeCss()  →  .storybook/tokens.css
       │                              :root { --ds-color-primary: #0052CC }
       │                              [data-theme='dark'] { --ds-color-primary: #4C9AFF }
       │                              [data-theme='brand'] { --ds-color-primary: #00875A }
       │
       └── tailwind.config.ts  →  .bg-primary { background-color: var(--ds-color-primary) }
```

O Storybook tem um theme switcher na toolbar que dispara o decorator e aplica o tema em todos os componentes simultaneamente.

---

## Storybook Intelligence — RAG

Um assistente dentro do Storybook que responde perguntas sobre os componentes consultando a documentação **real** do repositório — não um LLM genérico.

```
Pergunta do usuário
  → embedding (OpenAI text-embedding-3-small)
  → busca por similaridade no pgvector (Supabase) — TOP 4 chunks
  → contexto real: props, exemplos de uso, padrões ARIA
  → resposta com gpt-4o-mini fundamentada na documentação real
```

> *"Como uso o DatePicker com React Hook Form?"* → resposta com exemplo de código baseado no componente real do repositório.

**Decisão documentada:** foi encontrado um bug real no índice `ivfflat` — quando criado em tabela vazia, as buscas retornavam zero resultados. O índice precisou ser recriado após a inserção dos dados. Ver `apps/api/src/scripts/migrate.ts`.

---

## Health Dashboard — governança como produto

Todas as métricas são calculadas lendo o código-fonte em tempo de execução via `pnpm metrics`. Nenhum número é estático.

```bash
cd apps/storybook && pnpm metrics
```

**Estado atual:**

| Métrica | Valor |
|---|---|
| Componentes | 22 |
| Cobertura de stories | 100% |
| Cobertura de testes | 100% |
| Cobertura de JSDoc | 100% |
| Testes unitários | 102 |
| Testes Storybook (a11y) | 90 |

---

## Developer workflow

### Qualidade automatizada

Cada commit passa por dois gates obrigatórios:

**`pre-commit`** — 102 testes unitários rodando antes de qualquer commit:
```bash
# .husky/pre-commit
pnpm --filter @design-system/ui run test
```

**`commit-msg`** — mensagens validadas com [Conventional Commits](https://conventionalcommits.org):
```bash
feat: adiciona variante outline no Button     ✅
fix: corrige contraste do Badge warning       ✅
design: melhora animação do Accordion         ✅
Adicionando nova feature                      ❌  (sem tipo, maiúscula)
```

### CI/CD (GitHub Actions)

```
push / PR → main
  ├── Lint
  ├── Generate tokens (web + Android + iOS + Flutter + React Native)
  ├── Build (Storybook + TypeScript check)
  ├── 102 testes unitários
  ├── Upload artefato (storybook-static)
  └── Lighthouse CI (performance audit)
```

---

## Stack

| Camada | Tecnologia | Decisão |
|---|---|---|
| Componentes | React 18 + TypeScript 5 | — |
| Estilos | Tailwind CSS + CVA | variantes tipadas, sem CSS modules |
| Tokens | TypeScript puro + Style Dictionary | type-safety + multi-plataforma |
| Monorepo | Turborepo + pnpm workspaces | cache de build, task graph |
| Documentação | Storybook 8 (Vite builder) | addon-a11y, addon-interactions |
| Testes | Vitest + Testing Library + Storybook Test Runner | unitários + a11y |
| IA / RAG | OpenAI + pgvector (Supabase) | embeddings + busca por similaridade |
| API | Node.js + Fastify | leve, tipado |
| Commits | Husky + commitlint | padronização do histórico |
| CI | GitHub Actions + Lighthouse | qualidade automatizada |

**Componentes construídos do zero** — sem Radix UI, sem shadcn/ui. Decisão deliberada para demonstrar implementação direta dos padrões de acessibilidade. O único utilitário externo de UI é `@floating-ui/react` para posicionamento de overlays.

---

## Estrutura do monorepo

```
apps/
  api/              → Fastify API — pipeline RAG (extract → embed → ask)
  storybook/        → Documentação, ChatWidget, Health Dashboard, examples
packages/
  ui/               → 22 componentes, 102 testes
  tokens/           → Design tokens · CSS Transformer · Style Dictionary
  config/           → tsconfig e ESLint compartilhados
```

---

## Como rodar localmente

```bash
# Instalar dependências
pnpm install

# Gerar tokens para todas as plataformas
pnpm --filter @design-system/tokens generate:all

# Rodar testes
pnpm --filter @design-system/ui test

# Rodar o Storybook
cd apps/storybook
pnpm metrics      # atualiza o Health Dashboard
pnpm storybook    # http://localhost:6006
```

### (Opcional) Storybook Intelligence com RAG

Crie `apps/api/.env` a partir de `apps/api/.env.example`:

```env
DATABASE_URL=<connection string Supabase pooler>
OPENAI_API_KEY=<sua chave OpenAI>
PORT=3333
```

```bash
cd apps/api
pnpm db:migrate   # cria tabela + índice ivfflat (após inserção)
pnpm extract      # extrai docs dos componentes
pnpm embed        # gera embeddings no pgvector
pnpm dev
```

---

## Decisões de arquitetura

**Componentes sem biblioteca headless**
Trade-off entre controle e velocidade. Implementar focus trap, roving tabindex e combobox do zero exige mais tempo mas demonstra compreensão profunda dos padrões ARIA. Ver [`CONTRIBUTING.md`](./CONTRIBUTING.md) para a documentação de cada decisão.

**Tokens como TypeScript puro**
Type-safety nativa, tree-shaking, e um único adapter gera saída para qualquer plataforma. Sem JSON ou YAML — os tokens são importáveis diretamente.

**Temas via CSS custom properties**
Troca em runtime sem rebuild. O mesmo mecanismo suporta `prefers-color-scheme` automaticamente para o tema dark.

**Style Dictionary como camada de transformação**
Em vez de manter transformers separados para cada plataforma, o adapter converte o formato TypeScript interno para o formato Style Dictionary, que cuida do output. Adicionar uma nova plataforma (ex: Windows/WinUI) é adicionar um bloco de configuração.

**RAG enxuto**
Pipeline simples e correto (`extract → embed → similarity search → generate`) em vez de complexo e frágil. Bug real documentado: índice `ivfflat` criado em tabela vazia não funciona — foi descoberto, corrigido e documentado no código.

**Métricas nunca mockadas**
O `pnpm metrics` lê o filesystem real. Se um componente perde stories ou testes, o número cai imediatamente.

---

Ver [`CHANGELOG.md`](./CHANGELOG.md) e [`CONTRIBUTING.md`](./CONTRIBUTING.md).
