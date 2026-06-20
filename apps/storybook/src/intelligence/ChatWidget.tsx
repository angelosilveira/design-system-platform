import React, { useState, type FormEvent } from "react";
import { Button, Card, Input } from "@design-system/ui";

interface Source {
  component: string;
  file: string;
  similarity: number;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!question.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: question };
    setMessages((current) => [...current, userMessage]);
    setQuestion("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error(`API respondeu com status ${response.status}`);
      }

      const data: { answer: string; sources: Source[] } = await response.json();

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.answer, sources: data.sources },
      ]);
    } catch (err) {
      setError(
        "Não consegui falar com a API. Ela está rodando em " +
          `${API_URL}? (pnpm dev dentro de apps/api)`,
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card.Root
      className="flex h-[600px] w-full max-w-xl flex-col"
      padding="none"
    >
      <Card.Header className="border-b border-border p-4">
        <Card.Title>Design System Copilot</Card.Title>
        <Card.Description>
          Pergunte sobre os componentes do Design System — as respostas vêm da
          documentação real.
        </Card.Description>
      </Card.Header>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="text-sm text-text-subtle">
            Exemplo: &quot;Como uso o DatePicker com React Hook Form?&quot;
          </p>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user"
                ? "flex justify-end"
                : "flex justify-start"
            }
          >
            <div
              className={
                message.role === "user"
                  ? "max-w-[85%] rounded-lg bg-primary px-3 py-2 text-text-inverse"
                  : "max-w-[85%] rounded-lg bg-surface-subtle px-3 py-2 text-text"
              }
            >
              <p className="whitespace-pre-wrap text-sm">{message.content}</p>

              {message.sources && message.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 border-t border-border pt-2">
                  {message.sources.map((source) => (
                    <span
                      key={source.component}
                      className="rounded bg-surface px-2 py-0.5 text-xs text-text-subtle"
                      title={`${source.file} · similaridade ${source.similarity}`}
                    >
                      {source.component}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && <p className="text-sm text-text-subtle">Pensando...</p>}
        {error && <p className="text-sm text-danger">{error}</p>}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-border p-4"
      >
        <div className="flex-1">
          <Input
            label="Pergunta"
            placeholder="Como uso o Select?"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" isLoading={isLoading} disabled={!question.trim()}>
          Enviar
        </Button>
      </form>
    </Card.Root>
  );
}
