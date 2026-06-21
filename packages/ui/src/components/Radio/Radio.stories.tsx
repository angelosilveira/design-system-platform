import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio } from "./Radio";

const meta: Meta = {
  title: "Components/Radio",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("mensal");
    return (
      <Radio.Group name="plano" value={value} onChange={setValue} label="Plano de assinatura">
        <Radio.Item value="mensal" label="Mensal" />
        <Radio.Item value="anual" label="Anual (economize 20%)" />
        <Radio.Item value="lifetime" label="Vitalício" />
      </Radio.Group>
    );
  },
};

export const WithError: Story = {
  render: () => (
    <Radio.Group name="tamanho" value="" onChange={() => {}} label="Tamanho" errorMessage="Selecione um tamanho.">
      <Radio.Item value="p" label="P" />
      <Radio.Item value="m" label="M" />
      <Radio.Item value="g" label="G" />
    </Radio.Group>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Radio.Group name="status" value="ativo" onChange={() => {}} label="Status" disabled>
      <Radio.Item value="ativo" label="Ativo" />
      <Radio.Item value="inativo" label="Inativo" />
    </Radio.Group>
  ),
};
