import type { Meta, StoryObj } from "@storybook/react";
import { HealthDashboard } from "./HealthDashboard";

const meta: Meta<typeof HealthDashboard> = {
  title: "Health Dashboard/Overview",
  component: HealthDashboard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Painel de saúde do Design System. Todas as métricas são calculadas lendo o " +
          "código real do repositório (via `pnpm metrics` em apps/storybook) — nenhum " +
          "número aqui é mockado.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HealthDashboard>;

export const Default: Story = {
  render: () => <HealthDashboard />,
};
