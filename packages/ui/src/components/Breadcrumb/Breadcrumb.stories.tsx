import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta = {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Breadcrumb.Root>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Início</Breadcrumb.Link>
        <Breadcrumb.Separator />
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/produtos">Produtos</Breadcrumb.Link>
        <Breadcrumb.Separator />
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Page>Camiseta Azul</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.Root>
  ),
};

export const DeepNavigation: Story = {
  render: () => (
    <Breadcrumb.Root>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Início</Breadcrumb.Link>
        <Breadcrumb.Separator />
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/docs">Documentação</Breadcrumb.Link>
        <Breadcrumb.Separator />
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/docs/componentes">Componentes</Breadcrumb.Link>
        <Breadcrumb.Separator />
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.Root>
  ),
};

export const TwoLevels: Story = {
  render: () => (
    <Breadcrumb.Root>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Início</Breadcrumb.Link>
        <Breadcrumb.Separator />
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Page>Configurações</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.Root>
  ),
};
