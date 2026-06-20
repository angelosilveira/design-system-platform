import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Button } from "../Button";

const meta: Meta<typeof Card.Root> = {
  title: "Components/Card",
  component: Card.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Card.Root>;

export const Default: Story = {
  render: () => (
    <Card.Root className="w-80">
      <Card.Header>
        <Card.Title>Button</Card.Title>
        <Card.Description>
          Componente de ação principal do Design System.
        </Card.Description>
      </Card.Header>
      <Card.Body>4 variantes · 3 tamanhos · estado de loading</Card.Body>
      <Card.Footer>
        <Button size="sm" variant="ghost">
          Ver código
        </Button>
        <Button size="sm">Abrir no Storybook</Button>
      </Card.Footer>
    </Card.Root>
  ),
};

export const WithElevation: Story = {
  render: () => (
    <Card.Root className="w-80" elevation="md">
      <Card.Header>
        <Card.Title>Com elevação</Card.Title>
      </Card.Header>
      <Card.Body>Útil para destacar o card sobre o fundo da página.</Card.Body>
    </Card.Root>
  ),
};

export const NoPadding: Story = {
  render: () => (
    <Card.Root className="w-80 overflow-hidden" padding="none">
      <div className="h-32 bg-primary-subtle" />
      <div className="p-4">
        <Card.Title>Padding customizado por seção</Card.Title>
      </div>
    </Card.Root>
  ),
};
