import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select, type SelectOption } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const options: SelectOption[] = [
  { label: "Cartão de Crédito", value: "credit-card" },
  { label: "Pix", value: "pix" },
  { label: "Boleto", value: "boleto" },
  { label: "Transferência Bancária", value: "transfer" },
];

function SelectDemo(props: Partial<React.ComponentProps<typeof Select>>) {
  const [value, setValue] = useState<string | null>(props.value ?? null);
  return (
    <div className="w-72">
      <Select
        label="Forma de pagamento"
        options={options}
        value={value}
        onChange={setValue}
        {...props}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <SelectDemo />,
};

export const WithValueSelected: Story = {
  render: () => <SelectDemo value="pix" />,
};

export const WithError: Story = {
  render: () => (
    <SelectDemo errorMessage="Selecione uma forma de pagamento para continuar" />
  ),
};

export const Disabled: Story = {
  render: () => <SelectDemo disabled />,
};
