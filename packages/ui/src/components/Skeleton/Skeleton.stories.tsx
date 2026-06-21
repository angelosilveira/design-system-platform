import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Line: Story = { args: { variant: "line", width: "300px" } };
export const Circle: Story = { args: { variant: "circle", width: "48px", height: "48px" } };
export const Rect: Story = { args: { variant: "rect", width: "300px", height: "160px" } };

export const CardLoading: Story = {
  render: () => (
    <div className="flex gap-4 max-w-sm" aria-label="Carregando conteúdo" aria-busy="true">
      <Skeleton variant="circle" width="48px" height="48px" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton variant="line" width="60%" />
        <Skeleton variant="line" width="100%" />
        <Skeleton variant="line" width="80%" />
      </div>
    </div>
  ),
};

export const ArticleLoading: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-prose" aria-busy="true">
      <Skeleton variant="rect" width="100%" height="200px" />
      <Skeleton variant="line" width="70%" height="28px" />
      <Skeleton variant="line" />
      <Skeleton variant="line" />
      <Skeleton variant="line" width="90%" />
    </div>
  ),
};
