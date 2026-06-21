import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
  HomeIcon,
  InfoIcon,
  MenuIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  WarningIcon,
  XIcon,
} from "./Icon";

const meta: Meta = {
  title: "Components/Icon",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-6 p-4">
      {[
        { Icon: CheckIcon, name: "Check" },
        { Icon: XIcon, name: "X" },
        { Icon: ChevronDownIcon, name: "ChevronDown" },
        { Icon: ChevronUpIcon, name: "ChevronUp" },
        { Icon: ChevronLeftIcon, name: "ChevronLeft" },
        { Icon: ChevronRightIcon, name: "ChevronRight" },
        { Icon: AlertCircleIcon, name: "AlertCircle" },
        { Icon: InfoIcon, name: "Info" },
        { Icon: CheckCircleIcon, name: "CheckCircle" },
        { Icon: WarningIcon, name: "Warning" },
        { Icon: SearchIcon, name: "Search" },
        { Icon: ExternalLinkIcon, name: "ExternalLink" },
        { Icon: PlusIcon, name: "Plus" },
        { Icon: MenuIcon, name: "Menu" },
        { Icon: UserIcon, name: "User" },
        { Icon: SettingsIcon, name: "Settings" },
        { Icon: HomeIcon, name: "Home" },
      ].map(({ Icon, name }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon size={24} className="text-text" />
          <span className="text-xs text-text-subtle">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <CheckIcon size={16} />
      <CheckIcon size={20} />
      <CheckIcon size={24} />
      <CheckIcon size={32} />
      <CheckIcon size={48} />
    </div>
  ),
};
