# Roadmap — Fase 2

> A Fase 1 deste projeto (Design System completo + Storybook Intelligence + Health
> Dashboard) está implementada com profundidade. As features abaixo fazem parte da
> visão original do projeto, mas foram conscientemente deixadas como **arquitetura
> preparada, não implementação** — uma decisão de escopo dado o prazo.

## 1. Design Token Manager multiplataforma

**Status:** schema de tokens já desacoplado e pronto para extensão.

Os tokens em `packages/tokens/src` já são objetos TypeScript simples, o que
significa que qualquer transformer pode percorrer esse objeto e gerar saída
para outras plataformas sem precisar redesenhar o schema.

O contrato está definido em `packages/tokens/src/transformers/types.ts`
(`TokenTransformer`). A feature completa envolveria:

- Um transformer para **Android** (`Color.kt`, `Dimens.kt`)
- Um transformer para **iOS** (`Color.swift`, `Spacing.swift`)
- Um transformer para **CSS puro** (`:root { --color-primary: ... }`)
- Um preview em tempo real comparando o resultado de cada transformer

## 2. Accessibility Auditor com IA

**Status:** contrato de tipos definido, pacote vazio de implementação.

Ver `packages/a11y-auditor/README.md`. A versão completa provavelmente
usaria IA para sugerir correções automaticamente, não só apontar o
problema — mas a base de regras determinísticas viria antes disso. Uma vez
implementado, se conectaria ao Health Dashboard como mais uma métrica real.

## 3. Aplicação consumidora do Design System

A ideia original incluía não só o Design System, mas uma aplicação real
consumindo-o, para demonstrar a experiência de quem usa a biblioteca no dia
a dia. Ficou fora do escopo da Fase 1 por decisão consciente de prazo.

## Por que documentar isso em vez de só não fazer

Mostrar que essas features foram **pensadas e arquitetadas**, com pontos de
extensão já existindo no código, é mais forte como sinal de senioridade do
que implementá-las pela metade sob pressão de prazo.

## 4. Performance medida — descoberta e limitação conhecida

**Status:** medido com Lighthouse CI (ver `.github/workflows/ci.yml`, job
`performance-tests`), com resultado documentado e entendido — não apenas
assumido por boas práticas.

Ao apontar o Lighthouse para stories reais (`Button` e `Health Dashboard`),
o resultado foi:

- **Acessibilidade: aprovado** (≥ 90% nas duas páginas testadas) — validação
  externa e automatizada de que os componentes são acessíveis de verdade,
  não só por inspeção manual.
- **Performance: baixa (39–44%)** — mas por um motivo específico e não
  relacionado ao código dos componentes: mesmo testando um único componente
  isolado, o Lighthouse carrega o **bundle inteiro do preview do
  Storybook** (engine de renderização de todas as stories + addons de
  a11y/docs/interactions, juntos somando mais de 2MB de JS). Esse peso é da
  ferramenta Storybook em si, não do Design System.

**Por que isso não foi "corrigido" nesta fase:** otimizar o bundle do
próprio Storybook (code-splitting mais agressivo da ferramenta) teria
esforço alto e baixo retorno para o objetivo do projeto. Um benchmark de
performance mais representativo dos componentes em uso real exigiria testá-
los dentro de uma aplicação consumidora de verdade — exatamente o item 3
deste roadmap (aplicação consumidora do Design System), ainda não
construída.

**Decisão de configuração:** a assertion de performance no
`lighthouserc.json` está como `"warn"`, não `"error"` — propositalmente,
para não bloquear o CI por uma métrica que reflete a ferramenta de
documentação, não o produto.
