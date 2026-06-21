import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "danger"] },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: { variant: "info", title: "Informação", children: "Sua sessão expira em 30 minutos." },
};

export const Success: Story = {
  args: { variant: "success", title: "Sucesso!", children: "Perfil atualizado com sucesso." },
};

export const Warning: Story = {
  args: { variant: "warning", title: "Atenção", children: "Esta ação não pode ser desfeita." },
};

export const Danger: Story = {
  args: { variant: "danger", title: "Erro", children: "Falha ao salvar. Tente novamente." },
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    if (!visible) return <p className="text-sm text-text-subtle">Alerta fechado.</p>;
    return (
      <Alert variant="info" title="Novo recurso disponível" onDismiss={() => setVisible(false)}>
        Experimente as novas opções de personalização no seu perfil.
      </Alert>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert variant="info">Informação importante para o usuário.</Alert>
      <Alert variant="success">Operação realizada com sucesso.</Alert>
      <Alert variant="warning">Verifique os dados antes de continuar.</Alert>
      <Alert variant="danger">Ocorreu um erro inesperado.</Alert>
    </div>
  ),
};
