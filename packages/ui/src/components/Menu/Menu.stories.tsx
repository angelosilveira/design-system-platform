import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";

const meta: Meta = {
  title: "Components/Menu",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Menu.Root>
      <Menu.Trigger>Ações</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Editar</Menu.Item>
        <Menu.Item>Duplicar</Menu.Item>
        <Menu.Item>Mover para pasta</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Excluir</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <div className="flex justify-end w-64">
      <Menu.Root>
        <Menu.Trigger>Opções</Menu.Trigger>
        <Menu.Content align="end">
          <Menu.Item>Configurações</Menu.Item>
          <Menu.Item>Meu perfil</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Sair</Menu.Item>
        </Menu.Content>
      </Menu.Root>
    </div>
  ),
};
