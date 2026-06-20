import { db } from "../lib/db";
import { openai, EMBEDDING_MODEL } from "../lib/openai";

const question = "Como uso o DatePicker?";

const embeddingResponse = await openai.embeddings.create({
  model: EMBEDDING_MODEL,
  input: question,
});
const questionEmbedding = embeddingResponse.data[0].embedding;

console.log("Embedding gerado, tamanho:", questionEmbedding.length);

const result = await db.query(
  `SELECT component_name, 1 - (embedding <=> $1) AS similarity
   FROM component_docs
   ORDER BY embedding <=> $1
   LIMIT 4`,
  [JSON.stringify(questionEmbedding)],
);

console.log("Resultados:", result.rows);
await db.end();
