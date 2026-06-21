import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PaginatedTable } from "./PaginatedTable";

const meta: Meta<typeof PaginatedTable> = {
  title: "Exemplos/Tabela Paginada",
  component: PaginatedTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Demonstra a composição de Table, Pagination, Badge e Input num padrão comum de listagem com busca, ordenação por coluna e paginação automática. Dataset com 47 registros divididos em páginas de 8 itens.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaginatedTable>;

export const Default: Story = {
  name: "Lista de Membros",
};
