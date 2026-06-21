import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = { args: { label: "Descrição", placeholder: "Escreva algo..." } };

export const WithHelperText: Story = {
  args: { label: "Biografia", helperText: "Máximo de 500 caracteres.", rows: 4 },
};

export const WithError: Story = {
  args: { label: "Comentário", errorMessage: "O comentário não pode estar vazio." },
};

export const Required: Story = { args: { label: "Mensagem", required: true, rows: 5 } };

export const Disabled: Story = {
  args: { label: "Campo desabilitado", disabled: true, defaultValue: "Conteúdo fixo" },
};
