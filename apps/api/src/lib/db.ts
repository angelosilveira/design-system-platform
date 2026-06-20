import "dotenv/config";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL não definida. Copie apps/api/.env.example para apps/api/.env e preencha.",
  );
}

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // necessário para a conexão gerenciada do Supabase
});
