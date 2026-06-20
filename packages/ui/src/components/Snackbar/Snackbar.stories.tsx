import type { Meta, StoryObj } from "@storybook/react";
import { SnackbarProvider, useSnackbar } from "./Snackbar";
import { Button } from "../Button";

const meta: Meta = {
  title: "Components/Snackbar",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: React.ComponentType) => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

function SnackbarDemo() {
  const { showSnackbar } = useSnackbar();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          showSnackbar("Componente salvo com sucesso", { variant: "success" })
        }
      >
        Sucesso
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          showSnackbar("Falha ao salvar componente", { variant: "danger" })
        }
      >
        Erro
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          showSnackbar("Há uma nova versão disponível", { variant: "warning" })
        }
      >
        Aviso
      </Button>
      <Button
        variant="ghost"
        onClick={() => showSnackbar("Esta é uma notificação informativa")}
      >
        Padrão
      </Button>
    </div>
  );
}

export const Default: Story = {
  render: () => <SnackbarDemo />,
};
