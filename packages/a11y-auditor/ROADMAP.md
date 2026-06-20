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
