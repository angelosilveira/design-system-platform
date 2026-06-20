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

| Feature                                                                                    | Status                           | Onde está                                      |
| ------------------------------------------------------------------------------------------ | -------------------------------- | ---------------------------------------------- |
| 8 componentes acessíveis (Button, Input, Modal, Select, Card, Snackbar, DatePicker, Table) | ✅ Implementado                  | `packages/ui`                                  |
| Design tokens centralizados                                                                | ✅ Implementado                  | `packages/tokens`                              |
| Storybook documentado, com addon de acessibilidade                                         | ✅ Implementado                  | `apps/storybook`                               |
| 35 testes unitários (Vitest + Testing Library)                                             | ✅ Implementado                  | `packages/ui/src/**/*.test.tsx`                |
| **Storybook Intelligence** — chat com RAG sobre a documentação real                        | ✅ Implementado                  | `apps/api` + `apps/storybook/src/intelligence` |
| **Health Dashboard** — métricas reais de cobertura/documentação                            | ✅ Implementado                  | `apps/storybook/src/dashboard`                 |
| Token Manager multiplataforma                                                              | 📐 Arquitetado, não implementado | `packages/tokens/src/transformers`             |
| Accessibility Auditor com IA                                                               | 📐 Arquitetado, não implementado | `packages/a11y-auditor`                        |

Ver [`ROADMAP.md`](./ROADMAP.md) para o detalhe do que está arquitetado vs. implementado e por quê.

## 🧠 Storybook Intelligence — o diferencial

Um copilot que responde perguntas sobre os componentes consultando a
documentação **real** do projeto via RAG (Retrieval Augmented Generation):

\`\`\`
Pergunta do usuário
→ embedding da pergunta (OpenAI)
→ busca por similaridade no pgvector (Supabase)
→ contexto real recuperado (props, descrição, exemplo de uso)
→ resposta gerada com base nesse contexto (não em conhecimento genérico)
\`\`\`

Pergunte algo como _"Como uso o DatePicker com React Hook Form?"_ e a resposta
vem com um exemplo de código baseado no componente real do repositório — não
uma resposta genérica de LLM.

## 📊 Health Dashboard — governança como produto

Todas as métricas (cobertura de documentação, de testes, de descrição JSDoc)
são calculadas lendo o código real do repositório a cada execução de
`pnpm metrics` — sem números inventados. Ver
`apps/storybook/scripts/generate-metrics.ts`.

## 🏗️ Stack

- **Frontend**: React + TypeScript + Tailwind CSS + `class-variance-authority`
- **Monorepo**: Turborepo + pnpm workspaces
- **Documentação**: Storybook 8 (Vite builder, addon-a11y, addon-interactions)
- **Testes**: Vitest + Testing Library
- **IA / RAG**: OpenAI (embeddings + chat) + pgvector (Supabase)
- **API**: Node + Fastify
- **Componentes construídos do zero** (sem Radix/MUI) — decisão deliberada
  para demonstrar implementação direta de padrões de acessibilidade
  (focus trap, roving tabindex, combobox ARIA), com `@floating-ui/react`
  usado apenas para cálculo de posicionamento e navegação por teclado de
  overlays (Select, DatePicker), não como substituto de acessibilidade.

## 📁 Estrutura do monorepo

\`\`\`
apps/
api/ → API Fastify do Storybook Intelligence (RAG)
storybook/ → Storybook, ChatWidget, Health Dashboard
packages/
ui/ → Os 8 componentes do Design System
tokens/ → Design tokens (fonte única de verdade)
a11y-auditor/→ Contrato de tipos do futuro Accessibility Auditor (Fase 2)
config/ → tsconfig compartilhado
\`\`\`

## 🚀 Como rodar localmente

### Pré-requisitos

- Node 18+
- pnpm (\`npm install -g pnpm\`)
- Conta na [OpenAI](https://platform.openai.com) (para o chat) — opcional, o resto do projeto roda sem isso
- Conta no [Supabase](https://supabase.com) (banco com pgvector já habilitado) — opcional, mesma observação acima

### 1. Instalar e validar a base

\`\`\`bash
pnpm install
pnpm build
pnpm test
\`\`\`

### 2. Rodar o Storybook (Design System + Health Dashboard)

\`\`\`bash
cd apps/storybook
pnpm metrics # gera as métricas do Health Dashboard
pnpm storybook
\`\`\`
Abre em \`http://localhost:6006\`.

### 3. (Opcional) Rodar o Storybook Intelligence — chat com RAG

Crie \`apps/api/.env\` a partir de \`apps/api/.env.example\`, preenchendo:
\`\`\`
DATABASE_URL=<connection string do pooler do Supabase>
OPENAI_API_KEY=<sua chave da OpenAI>
PORT=3333
\`\`\`

\`\`\`bash
cd apps/api
pnpm db:migrate
pnpm extract
pnpm embed
pnpm dev
\`\`\`

Com a API rodando, volte ao Storybook → **Storybook Intelligence → Chat**.

## 🧪 Testes

\`\`\`bash
cd packages/ui
pnpm test
\`\`\`
35 testes cobrindo os 8 componentes — renderização, interação, e
comportamento de acessibilidade (foco, ARIA, navegação por teclado).

## 🔍 Decisões de arquitetura que valem destacar numa conversa técnica

- **Componentes do zero vs. biblioteca headless**: trade-off consciente entre
  controle total e velocidade de desenvolvimento — ver \`ROADMAP.md\` e os
  comentários de JSDoc em cada componente para o raciocínio de acessibilidade
  específico de cada um.
- **RAG enxuto, sem reranking/agentes**: decisão de escopo dada a primeira
  experiência do autor com a técnica — preferiu um pipeline simples e
  correto a um complexo e frágil.
- **Bug real de índice \`ivfflat\`** encontrado e corrigido durante o
  desenvolvimento: o índice estava sendo criado numa tabela vazia (antes do
  \`embed.ts\` popular os dados), o que causava buscas por similaridade
  retornarem zero resultados mesmo com dados presentes. Ver o comentário em
  \`apps/api/src/scripts/migrate.ts\`.
- **Métricas do dashboard nunca mockadas**: cada número é derivado de uma
  leitura real do código-fonte no momento da execução do script.
