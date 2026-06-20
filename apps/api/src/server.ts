import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { askRoutes } from "./routes/ask";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: [
    "https://design-system-platform-storybook.vercel.app",
    "http://localhost:6006",
  ],
});
app.get("/health", async () => ({ status: "ok" }));

await app.register(askRoutes);

const port = Number(process.env.PORT ?? 3333);

app
  .listen({ port, host: "0.0.0.0" })
  .then(() =>
    console.log(
      `🚀 API do Storybook Intelligence rodando em http://localhost:${port}`,
    ),
  )
  .catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
