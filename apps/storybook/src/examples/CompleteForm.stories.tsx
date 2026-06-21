import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CompleteForm } from "./CompleteForm";

const meta: Meta<typeof CompleteForm> = {
  title: "Exemplos/Formulário Completo",
  component: CompleteForm,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Demonstra a composição de 9 componentes do Design System em um único fluxo de cadastro: Typography, Input, Select, Textarea, Radio, Checkbox, Button, Alert e Badge. Inclui validação de formulário e feedback de sucesso/erro.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CompleteForm>;

export const Default: Story = {
  name: "Cadastro de Perfil",
};
