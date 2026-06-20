import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseProps } from "react-docgen-typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));
const UI_COMPONENTS_DIR = join(
  __dirname,
  "../../../../packages/ui/src/components",
);
const OUTPUT_PATH = join(__dirname, "extracted-docs.json");

export interface ExtractedDoc {
  componentName: string;
  sourceFile: string;
  content: string;
}

function extractComponentDocs(): ExtractedDoc[] {
  const componentDirs = readdirSync(UI_COMPONENTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const docs: ExtractedDoc[] = [];

  for (const componentName of componentDirs) {
    const componentPath = join(
      UI_COMPONENTS_DIR,
      componentName,
      `${componentName}.tsx`,
    );
    const storiesPath = join(
      UI_COMPONENTS_DIR,
      componentName,
      `${componentName}.stories.tsx`,
    );

    let propsInfo: ReturnType<typeof parseProps> = [];
    try {
      propsInfo = parseProps(componentPath, {
        savePropValueAsString: true,
      });
    } catch {
      console.warn(
        `⚠️  Não foi possível extrair props de ${componentName} — pulando props.`,
      );
    }

    let storiesContent = "";
    try {
      storiesContent = readFileSync(storiesPath, "utf-8");
    } catch {
      console.warn(`⚠️  Sem arquivo de stories para ${componentName}.`);
    }

    const description = propsInfo[0]?.description ?? "";
    const propsTable = propsInfo[0]
      ? Object.entries(propsInfo[0].props)
          .map(([propName, prop]) => {
            const required = prop.required ? "obrigatório" : "opcional";
            const type = prop.type?.name ?? "unknown";
            const propDescription = prop.description || "sem descrição";
            return `- ${propName} (${type}, ${required}): ${propDescription}`;
          })
          .join("\n")
      : "Sem informação de props disponível.";

    const usageExample = storiesContent
      .split("\n")
      .filter((line) => !line.trim().startsWith("import "))
      .join("\n")
      .trim();

    const content = [
      `Componente: ${componentName}`,
      description ? `Descrição: ${description}` : "",
      `Props:\n${propsTable}`,
      usageExample ? `Exemplo de uso (Storybook):\n${usageExample}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    docs.push({
      componentName,
      sourceFile: `packages/ui/src/components/${componentName}/${componentName}.tsx`,
      content,
    });
  }

  return docs;
}

const docs = extractComponentDocs();
writeFileSync(OUTPUT_PATH, JSON.stringify(docs, null, 2));
console.log(`✅ Extraídos ${docs.length} componentes para ${OUTPUT_PATH}`);
