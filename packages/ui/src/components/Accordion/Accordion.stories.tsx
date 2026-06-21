import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta: Meta = {
  title: "Components/Accordion",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="max-w-lg">
      <Accordion.Root>
        <Accordion.Item value="o-que-e">
          <Accordion.Trigger>O que é um Design System?</Accordion.Trigger>
          <Accordion.Content>
            Um Design System é uma coleção de componentes reutilizáveis, guiada por padrões claros, que permite às equipes construir produtos coerentes de forma mais rápida e eficiente.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="quando-usar">
          <Accordion.Trigger>Quando devo usar um Design System?</Accordion.Trigger>
          <Accordion.Content>
            Quando o produto tem múltiplas equipes trabalhando em paralelo, quando há inconsistências visuais recorrentes, ou quando se quer escalar o desenvolvimento sem perder qualidade.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="componentes">
          <Accordion.Trigger>Quais componentes estão disponíveis?</Accordion.Trigger>
          <Accordion.Content>
            Button, Input, Modal, Select, Card, Snackbar, Table, DatePicker, Checkbox, Radio, Textarea, Badge, Alert, Skeleton, Accordion, Link, Menu, Pagination, Tabs e Breadcrumb.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <div className="max-w-lg">
      <Accordion.Root defaultOpen="item1">
        <Accordion.Item value="item1">
          <Accordion.Trigger>Item aberto por padrão</Accordion.Trigger>
          <Accordion.Content>Este item começa expandido graças à prop defaultOpen.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2">
          <Accordion.Trigger>Item fechado</Accordion.Trigger>
          <Accordion.Content>Este começa fechado.</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
};
