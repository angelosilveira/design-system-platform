import type { DesignTokens } from "../index";

/**
 * Contrato de extensão para o futuro Token Manager multiplataforma (Fase 2).
 *
 * NÃO IMPLEMENTADO — este arquivo define apenas a interface que os
 * transformers reais (Android, iOS, CSS puro) deverão seguir, para que
 * fique claro onde e como plugar essa feature sem precisar redesenhar o
 * schema de tokens depois.
 *
 * Por que isso já é possível sem mudar nada em `packages/tokens/src/*`:
 * os tokens já são exportados como objetos TypeScript simples (não como
 * sintaxe específica do Tailwind), então qualquer transformer pode
 * percorrer esse objeto e gerar a saída que quiser.
 *
 * Exemplo de uso futuro (pseudocódigo, não implementado):
 *
 *   const androidTransformer: TokenTransformer = {
 *     platform: "android",
 *     transform: (tokens) => `
 *       object Color {
 *         val primary = Color(0xFF${tokens.colors.primary.DEFAULT.slice(1)})
 *       }
 *     `,
 *   };
 *
 *   writeFileSync("Color.kt", androidTransformer.transform(tokens));
 */
export interface TokenTransformer {
  platform: "android" | "ios" | "css";
  transform: (tokens: DesignTokens) => string;
}
