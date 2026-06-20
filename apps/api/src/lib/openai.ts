import "dotenv/config";
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "OPENAI_API_KEY não definida. Copie apps/api/.env.example para apps/api/.env e preencha.",
  );
}

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/** Modelo de embedding — escolhido por ser rápido e barato, suficiente para este escopo. */
export const EMBEDDING_MODEL = "text-embedding-3-small";
export const EMBEDDING_DIMENSIONS = 1536;

/** Modelo usado para gerar a resposta final do chat. */
export const CHAT_MODEL = "gpt-4o-mini";
