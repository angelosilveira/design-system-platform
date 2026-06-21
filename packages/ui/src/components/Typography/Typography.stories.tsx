import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta: Meta = {
  title: "Components/Typography",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography.Heading as="h1" size="3xl">Heading 3XL — H1</Typography.Heading>
      <Typography.Heading as="h2" size="2xl">Heading 2XL — H2</Typography.Heading>
      <Typography.Heading as="h2" size="xl">Heading XL — H2 (padrão)</Typography.Heading>
      <Typography.Heading as="h3" size="lg">Heading LG — H3</Typography.Heading>
      <Typography.Heading as="h4" size="md">Heading MD — H4</Typography.Heading>
      <Typography.Heading as="h5" size="sm">Heading SM — H5</Typography.Heading>
    </div>
  ),
};

export const Texts: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-prose">
      <Typography.Text size="lg">Texto Grande — Lorem ipsum dolor sit amet.</Typography.Text>
      <Typography.Text size="md">Texto Médio (padrão) — Lorem ipsum dolor sit amet consectetur adipiscing elit.</Typography.Text>
      <Typography.Text size="sm">Texto Pequeno — Lorem ipsum dolor sit amet.</Typography.Text>
      <Typography.Text subtle>Texto Sutil — Informação secundária ou de suporte.</Typography.Text>
      <Typography.Text weight="semibold">Texto em negrito — Destaque importante.</Typography.Text>
    </div>
  ),
};

export const Captions: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography.Caption>Última atualização: 20/06/2026</Typography.Caption>
      <Typography.Caption>Campo obrigatório</Typography.Caption>
    </div>
  ),
};
