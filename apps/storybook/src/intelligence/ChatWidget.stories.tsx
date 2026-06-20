import type { Meta, StoryObj } from "@storybook/react";
import { ChatWidget } from "./ChatWidget";

const meta: Meta<typeof ChatWidget> = {
  title: "Storybook Intelligence/Chat",
  component: ChatWidget,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Assistente de IA que responde perguntas sobre os componentes do Design System " +
          "usando RAG (Retrieval Augmented Generation): a pergunta é transformada em embedding, " +
          "comparada com a documentação real dos componentes (via pgvector) e o contexto " +
          "encontrado é enviado para um modelo de chat gerar a resposta final. " +
          "Requer a API rodando em `apps/api` (`pnpm dev`).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatWidget>;

export const Default: Story = {
  render: () => <ChatWidget />,
};
