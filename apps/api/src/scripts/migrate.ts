import { db } from "../lib/db";
import { EMBEDDING_DIMENSIONS } from "../lib/openai";

/**
 * Migração inicial do RAG.
 *
 * - `vector` extension: já vem disponível no Supabase, só precisa ser
 *   habilitada por projeto.
 * - `content_hash`: permite o script de embed (embed.ts) pular conteúdo
 *   que não mudou desde a última execução, evitando regerar embeddings
 *   (e gastar API da OpenAI) sem necessidade.
 *
 * NOTA sobre índice (decisão deliberada): propositalmente NÃO criamos um
 * índice `ivfflat` aqui. Esse tipo de índice precisa ser "treinado" com
 * dados reais para formar clusters úteis — criado numa tabela vazia (como
 * seria o caso logo após a migração, antes do `embed.ts` rodar), ele fica
 * com clusters mal formados e pode fazer buscas por similaridade
 * retornarem ZERO resultados mesmo com dados na tabela depois. Esse foi
 * um bug real encontrado durante o desenvolvimento deste projeto.
 * Com a escala atual (dezenas de componentes), uma busca sequencial é
 * rápida o suficiente e mais confiável. Se o catálogo de componentes
 * crescer para milhares de linhas, crie o índice DEPOIS de popular a
 * tabela via `embed.ts`, não antes.
 */
async function migrate() {
  await db.query("CREATE EXTENSION IF NOT EXISTS vector;");

  await db.query(`
    CREATE TABLE IF NOT EXISTS component_docs (
      id SERIAL PRIMARY KEY,
      component_name TEXT NOT NULL,
      source_file TEXT NOT NULL,
      content TEXT NOT NULL,
      content_hash TEXT NOT NULL,
      embedding VECTOR(${EMBEDDING_DIMENSIONS}),
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);

  console.log(
    "✅ Migração concluída: extensão vector + tabela component_docs prontas.",
  );
  await db.end();
}

migrate().catch((error) => {
  console.error("❌ Erro na migração:", error);
  process.exit(1);
});
