import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Table, type SortDirection } from "./Table";

const meta: Meta<typeof Table.Root> = {
  title: "Components/Table",
  component: Table.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Table.Root>;

interface ComponentUsage {
  name: string;
  usageCount: number;
  testCoverage: number;
}

const data: ComponentUsage[] = [
  { name: "Button", usageCount: 1200, testCoverage: 95 },
  { name: "Input", usageCount: 800, testCoverage: 90 },
  { name: "Select", usageCount: 410, testCoverage: 85 },
  { name: "Modal", usageCount: 300, testCoverage: 88 },
  { name: "DatePicker", usageCount: 150, testCoverage: 80 },
  { name: "Card", usageCount: 95, testCoverage: 92 },
];

export const Default: Story = {
  render: () => (
    <div className="w-[480px]">
      <Table.Root caption="Adoção dos componentes do Design System">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Componente</Table.HeaderCell>
            <Table.HeaderCell>Uso</Table.HeaderCell>
            <Table.HeaderCell>Cobertura de testes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.name}>
              <Table.Cell className="font-medium">{row.name}</Table.Cell>
              <Table.Cell>{row.usageCount.toLocaleString("pt-BR")}</Table.Cell>
              <Table.Cell>{row.testCoverage}%</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  ),
};

function SortableTableDemo() {
  const [sortKey, setSortKey] = useState<keyof ComponentUsage>("usageCount");
  const [direction, setDirection] = useState<SortDirection>("descending");

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const result = a[sortKey] > b[sortKey] ? 1 : -1;
      return direction === "ascending" ? result : -result;
    });
    return sorted;
  }, [sortKey, direction]);

  function handleSort(key: keyof ComponentUsage) {
    if (key === sortKey) {
      setDirection((current) =>
        current === "ascending" ? "descending" : "ascending",
      );
    } else {
      setSortKey(key);
      setDirection("ascending");
    }
  }

  return (
    <div className="w-[480px]">
      <Table.Root caption="Adoção dos componentes do Design System (ordenável)">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sortDirection={sortKey === "name" ? direction : "none"}
              onSort={() => handleSort("name")}
            >
              Componente
            </Table.HeaderCell>
            <Table.HeaderCell
              sortDirection={sortKey === "usageCount" ? direction : "none"}
              onSort={() => handleSort("usageCount")}
            >
              Uso
            </Table.HeaderCell>
            <Table.HeaderCell
              sortDirection={sortKey === "testCoverage" ? direction : "none"}
              onSort={() => handleSort("testCoverage")}
            >
              Cobertura de testes
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedData.map((row) => (
            <Table.Row key={row.name} isClickable>
              <Table.Cell className="font-medium">{row.name}</Table.Cell>
              <Table.Cell>{row.usageCount.toLocaleString("pt-BR")}</Table.Cell>
              <Table.Cell>{row.testCoverage}%</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export const Sortable: Story = {
  render: () => <SortableTableDemo />,
};

export const HiddenCaption: Story = {
  render: () => (
    <div className="w-[480px]">
      <Table.Root caption="Lista compacta de componentes" captionVisuallyHidden>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Componente</Table.HeaderCell>
            <Table.HeaderCell>Uso</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.slice(0, 3).map((row) => (
            <Table.Row key={row.name}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.usageCount.toLocaleString("pt-BR")}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  ),
};
