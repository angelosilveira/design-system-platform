import { db } from "../lib/db";

await db.query("DROP INDEX IF EXISTS component_docs_embedding_idx;");
console.log(
  "✅ Índice removido. Com poucas linhas, busca sequencial é suficiente e mais confiável.",
);

await db.end();
