import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const UI_COMPONENTS_DIR = join(
  __dirname,
  "../../../packages/ui/src/components",
);
const OUTPUT_PATH = join(__dirname, "../src/dashboard/metrics.json");

interface ComponentMetric {
  name: string;
  hasStories: boolean;
  hasTests: boolean;
  testCount: number;
  hasDescription: boolean;
  linesOfCode: number;
}

function generateMetrics() {
  const componentDirs = readdirSync(UI_COMPONENTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const components: ComponentMetric[] = componentDirs.map((name) => {
    const componentFile = join(UI_COMPONENTS_DIR, name, `${name}.tsx`);
    const storiesFile = join(UI_COMPONENTS_DIR, name, `${name}.stories.tsx`);
    const testFile = join(UI_COMPONENTS_DIR, name, `${name}.test.tsx`);

    const componentSource = existsSync(componentFile)
      ? readFileSync(componentFile, "utf-8")
      : "";
    const testSource = existsSync(testFile)
      ? readFileSync(testFile, "utf-8")
      : "";

    const hasStories = existsSync(storiesFile);
    const hasTests = existsSync(testFile);
    const testCount = (testSource.match(/\bit\(/g) ?? []).length;
    const hasDescription = /\/\*\*[\s\S]*?\*\//.test(componentSource);
    const linesOfCode = componentSource.split("\n").length;

    return {
      name,
      hasStories,
      hasTests,
      testCount,
      hasDescription,
      linesOfCode,
    };
  });

  const totalComponents = components.length;
  const documentationCoverage = Math.round(
    (components.filter((c) => c.hasStories).length / totalComponents) * 100,
  );
  const testCoverage = Math.round(
    (components.filter((c) => c.hasTests).length / totalComponents) * 100,
  );
  const descriptionCoverage = Math.round(
    (components.filter((c) => c.hasDescription).length / totalComponents) * 100,
  );
  const totalTests = components.reduce((sum, c) => sum + c.testCount, 0);

  const metrics = {
    generatedAt: new Date().toISOString(),
    totalComponents,
    documentationCoverage,
    testCoverage,
    descriptionCoverage,
    totalTests,
    components,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(metrics, null, 2));
  console.log(
    `✅ Métricas geradas para ${totalComponents} componentes em ${OUTPUT_PATH}`,
  );
  console.log(
    `   Documentação: ${documentationCoverage}% · Testes: ${testCoverage}% · Descrição: ${descriptionCoverage}%`,
  );
}

generateMetrics();
