# @design-system/a11y-auditor

> **Status: roadmap (Fase 2) — não implementado.**

Este pacote existe apenas para documentar a arquitetura de uma feature futura: um
auditor de acessibilidade que analisa componentes (contraste, `aria-label`,
navegação por teclado, indicadores de foco) e retorna uma lista estruturada de
problemas encontrados.

## Por que isso existe vazio

Decidir o **contrato** (os tipos em `src/types.ts`) antes de implementar a
lógica é uma forma deliberada de mostrar como a feature se encaixaria na
arquitetura geral do Design System — sem comprometer o prazo da Fase 1
implementando algo pela metade.

## Como isso se encaixaria no monorepo

Quando implementado, este pacote consumiria os componentes de
`@design-system/ui`, rodaria as regras de auditoria, e poderia se conectar
ao Health Dashboard (`apps/storybook/src/dashboard`) como mais uma métrica
real — substituindo a checagem manual via `addon-a11y` por verificação
automatizada e versionável.
