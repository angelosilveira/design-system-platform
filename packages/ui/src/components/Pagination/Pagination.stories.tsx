import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />;
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />;
  },
};

export const FirstPage: Story = {
  args: { currentPage: 1, totalPages: 10, onPageChange: () => {} },
};

export const LastPage: Story = {
  args: { currentPage: 10, totalPages: 10, onPageChange: () => {} },
};

export const SinglePage: Story = {
  args: { currentPage: 1, totalPages: 1, onPageChange: () => {} },
};
