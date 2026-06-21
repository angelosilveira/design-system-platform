import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["default", "primary", "success", "danger", "warning"] },
    size: { control: "select", options: ["sm", "md"] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: "Padrão", variant: "default" } };
export const Primary: Story = { args: { children: "Novo", variant: "primary" } };
export const Success: Story = { args: { children: "Ativo", variant: "success" } };
export const Danger: Story = { args: { children: "Inativo", variant: "danger" } };
export const Warning: Story = { args: { children: "Pendente", variant: "warning" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Padrão</Badge>
      <Badge variant="primary">Novo</Badge>
      <Badge variant="success">Ativo</Badge>
      <Badge variant="danger">Erro</Badge>
      <Badge variant="warning">Atenção</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
};
