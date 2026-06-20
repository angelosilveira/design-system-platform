import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Nome completo",
    placeholder: "Digite seu nome",
  },
};

export const Required: Story = {
  args: {
    label: "E-mail",
    placeholder: "voce@exemplo.com",
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Senha",
    type: "password",
    helperText: "Mínimo de 8 caracteres",
  },
};

export const WithError: Story = {
  args: {
    label: "CPF",
    defaultValue: "123.456",
    errorMessage: "CPF inválido — verifique o número digitado",
  },
};

export const Disabled: Story = {
  args: {
    label: "Campo bloqueado",
    defaultValue: "Não editável",
    disabled: true,
  },
};
