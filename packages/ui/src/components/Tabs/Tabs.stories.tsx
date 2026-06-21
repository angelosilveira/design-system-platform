import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta: Meta = {
  title: "Components/Tabs",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="max-w-lg">
      <Tabs.Root defaultTab="visao-geral">
        <Tabs.List>
          <Tabs.Trigger value="visao-geral">Visão Geral</Tabs.Trigger>
          <Tabs.Trigger value="configuracoes">Configurações</Tabs.Trigger>
          <Tabs.Trigger value="integrações">Integrações</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="visao-geral">
          <p className="text-sm text-text-subtle">Resumo geral do projeto com métricas e atividade recente.</p>
        </Tabs.Content>
        <Tabs.Content value="configuracoes">
          <p className="text-sm text-text-subtle">Ajuste as configurações do projeto: nome, visibilidade e permissões.</p>
        </Tabs.Content>
        <Tabs.Content value="integrações">
          <p className="text-sm text-text-subtle">Conecte ferramentas externas como GitHub, Slack e Figma.</p>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs.Root defaultTab="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
        <Tabs.Trigger value="tab4">Tab 4</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Conteúdo da Tab 1</Tabs.Content>
      <Tabs.Content value="tab2">Conteúdo da Tab 2</Tabs.Content>
      <Tabs.Content value="tab3">Conteúdo da Tab 3</Tabs.Content>
      <Tabs.Content value="tab4">Conteúdo da Tab 4</Tabs.Content>
    </Tabs.Root>
  ),
};
