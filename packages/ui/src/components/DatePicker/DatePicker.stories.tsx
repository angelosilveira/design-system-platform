import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      height: "720px",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

function DatePickerDemo(
  props: Partial<React.ComponentProps<typeof DatePicker>>,
) {
  const [value, setValue] = useState<Date | null>(props.value ?? null);
  return (
    <div className="w-72">
      <DatePicker
        label="Data de nascimento"
        value={value}
        onChange={setValue}
        {...props}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <DatePickerDemo />,
};

export const WithValueSelected: Story = {
  render: () => <DatePickerDemo value={new Date()} />,
};

export const WithError: Story = {
  render: () => (
    <DatePickerDemo errorMessage="Data inválida — verifique o valor selecionado" />
  ),
};

export const Disabled: Story = {
  render: () => <DatePickerDemo disabled />,
};
