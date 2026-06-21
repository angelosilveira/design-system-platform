import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["default", "subtle", "standalone"] },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = { args: { children: "Ir para documentação", href: "#", variant: "default" } };
export const Subtle: Story = { args: { children: "Saiba mais", href: "#", variant: "subtle" } };
export const Standalone: Story = { args: { children: "Ver todos os componentes →", href: "#", variant: "standalone" } };

export const External: Story = {
  args: { children: "Storybook no ar", href: "https://storybook.js.org", external: true },
};

export const InText: Story = {
  render: () => (
    <p className="text-sm text-text max-w-sm">
      Leia nossa <Link href="#">política de privacidade</Link> antes de continuar.
      Para mais detalhes, acesse a <Link href="https://exemplo.com" external>documentação completa</Link>.
    </p>
  ),
};
