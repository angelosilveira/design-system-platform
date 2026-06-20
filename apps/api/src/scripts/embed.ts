import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "../lib/db";
import { openai, EMBEDDING_MODEL } from "../lib/openai";
import type { ExtractedDoc } from "./extract";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_PATH = join(__dirname, "extracted-docs.json");

function hashContent(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

async function embed() {
  const docs: ExtractedDoc[] = JSON.parse(readFileSync(INPUT_PATH, "utf-8"));

  let skipped = 0;
  let updated = 0;

  for (const doc of docs) {
    const contentHash = hashContent(doc.content);

    const existing = await db.query(
      "SELECT content_hash FROM component_docs WHERE component_name = $1",
      [doc.componentName],
    );

    if (existing.rows[0]?.content_hash === contentHash) {
      skipped++;
      continue;
    }

    const embeddingResponse = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: doc.content,
    });
    const embedding = embeddingResponse.data[0].embedding;

    await db.query("DELETE FROM component_docs WHERE component_name = $1", [
      doc.componentName,
    ]);

    await db.query(
      `INSERT INTO component_docs (component_name, source_file, content, content_hash, embedding)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        doc.componentName,
        doc.sourceFile,
        doc.content,
        contentHash,
        JSON.stringify(embedding),
      ],
    );

    updated++;
    console.log(`  ↳ embedding gerado para ${doc.componentName}`);
  }

  console.log(
    `✅ Embeddings prontos. ${updated} atualizados, ${skipped} sem mudança (cache).`,
  );
  await db.end();
}

embed().catch((error) => {
  console.error("❌ Erro ao gerar embeddings:", error);
  process.exit(1);
});
