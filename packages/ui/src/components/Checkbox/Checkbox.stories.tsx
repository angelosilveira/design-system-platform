import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = { args: { label: "Aceitar termos de uso" } };

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return <Checkbox label="Receber notificações" checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const WithError: Story = {
  args: { label: "Concordar com os termos", errorMessage: "Você precisa aceitar os termos para continuar." },
};

export const WithHelperText: Story = {
  args: { label: "Newsletter", helperText: "Você pode cancelar a qualquer momento." },
};

export const Required: Story = { args: { label: "Campo obrigatório", required: true } };

export const Disabled: Story = { args: { label: "Opção desabilitada", disabled: true } };

export const DisabledChecked: Story = {
  args: { label: "Opção desabilitada marcada", disabled: true, defaultChecked: true },
};
