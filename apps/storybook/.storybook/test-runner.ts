import type { TestRunnerConfig } from "@storybook/test-runner";
import { checkA11y, injectAxe } from "axe-playwright";

/**
 * Configuração do @storybook/test-runner — testes além de unitário.
 *
 * Abre CADA story num navegador headless real (via Playwright) e roda uma
 * checagem de acessibilidade (axe-core) contra o DOM renderizado. Isso
 * transforma o addon-a11y — que até aqui só dava feedback visual manual
 * dentro do Storybook — em um teste automatizado que QUEBRA o CI se algum
 * componente introduzir uma regressão de acessibilidade.
 *
 * Diferença em relação aos testes unitários (Vitest): aqui o componente
 * roda de verdade num browser, com CSS e layout reais.
 */
const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page) {
    await checkA11y(page, "#storybook-root", {
      detailedReport: true,
      detailedReportOptions: { html: true },
      axeOptions: {
        rules: {
          // Regra de "região"/landmark faz sentido para uma página
          // completa, não para um componente isolado renderizado sozinho
          // dentro de uma story.
          region: { enabled: false },
        },
      },
    });
  },
};

export default config;
