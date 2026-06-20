import type { FastifyInstance } from "fastify";
import { db } from "../lib/db";
import { openai, EMBEDDING_MODEL, CHAT_MODEL } from "../lib/openai";

interface AskRequestBody {
  question: string;
}

const SYSTEM_PROMPT = `Você é o assistente de documentação do Design System.
Responda SOMENTE com base no contexto fornecido abaixo, que vem da documentação
real dos componentes. Se o contexto não tiver informação suficiente para
responder, diga isso claramente em vez de inventar uma resposta.
Quando fizer sentido, inclua um exemplo de código no formato JSX/TSX.
Seja direto e técnico — o público são desenvolvedores.`;

export async function askRoutes(app: FastifyInstance) {
  app.post<{ Body: AskRequestBody }>("/ask", async (request, reply) => {
    const { question } = request.body;

    if (!question || question.trim().length === 0) {
      return reply
        .status(400)
        .send({ error: "Campo 'question' é obrigatório." });
    }

    const embeddingResponse = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: question,
    });
    const questionEmbedding = embeddingResponse.data[0].embedding;

    const searchResult = await db.query(
      `SELECT component_name, source_file, content,
              1 - (embedding <=> $1) AS similarity
       FROM component_docs
       ORDER BY embedding <=> $1
       LIMIT 4`,
      [JSON.stringify(questionEmbedding)],
    );

    const matches = searchResult.rows;

    if (matches.length === 0) {
      return reply.send({
        answer:
          "Ainda não há documentação indexada. Rode `pnpm extract && pnpm embed` no app de API primeiro.",
        sources: [],
      });
    }

    const context = matches
      .map((match) => `### ${match.component_name}\n${match.content}`)
      .join("\n\n---\n\n");

    const completion = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Contexto da documentação:\n\n${context}\n\nPergunta: ${question}`,
        },
      ],
      temperature: 0.2,
    });

    const answer =
      completion.choices[0]?.message?.content ??
      "Não consegui gerar uma resposta.";

    return reply.send({
      answer,
      sources: matches.map((match) => ({
        component: match.component_name,
        file: match.source_file,
        similarity: Number(match.similarity.toFixed(3)),
      })),
    });
  });
}
