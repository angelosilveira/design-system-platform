/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",     // nova funcionalidade
        "fix",      // correção de bug
        "design",   // mudança visual sem lógica (exclusivo do design system)
        "refactor", // refatoração sem mudança de comportamento
        "chore",    // manutenção (deps, config, scripts)
        "docs",     // documentação
        "test",     // adiciona ou corrige testes
        "perf",     // melhoria de performance
        "ci",       // mudanças de CI/CD
        "revert",   // reverte commit anterior
      ],
    ],
    "subject-case": [2, "always", "lower-case"],
    "subject-max-length": [2, "always", 100],
    "body-max-line-length": [2, "always", 150],
  },
};
