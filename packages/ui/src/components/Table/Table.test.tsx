import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Table } from "./Table";

describe("Table", () => {
  it("renderiza caption, cabeçalhos e células", () => {
    render(
      <Table.Root caption="Lista de componentes">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Uso</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Button</Table.Cell>
            <Table.Cell>1200</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>,
    );

    expect(screen.getByText("Lista de componentes")).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Nome" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Button")).toBeInTheDocument();
    expect(screen.getByText("1200")).toBeInTheDocument();
  });

  it("aplica a classe sr-only no caption quando captionVisuallyHidden=true", () => {
    render(
      <Table.Root caption="Tabela compacta" captionVisuallyHidden>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Coluna</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body />
      </Table.Root>,
    );

    expect(screen.getByText("Tabela compacta")).toHaveClass("sr-only");
  });

  it("cabeçalho ordenável tem aria-sort e dispara onSort ao clicar", async () => {
    const handleSort = vi.fn();
    const user = userEvent.setup();

    render(
      <Table.Root caption="Tabela ordenável">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sortDirection="ascending" onSort={handleSort}>
              Nome
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body />
      </Table.Root>,
    );

    const headerCell = screen.getByRole("columnheader", { name: "Nome" });
    expect(headerCell).toHaveAttribute("aria-sort", "ascending");

    await user.click(screen.getByRole("button", { name: "Nome" }));
    expect(handleSort).toHaveBeenCalledTimes(1);
  });

  it("cabeçalho não-ordenável não tem aria-sort nem botão interno", () => {
    render(
      <Table.Root caption="Tabela simples">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nome</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body />
      </Table.Root>,
    );

    const headerCell = screen.getByRole("columnheader", { name: "Nome" });
    expect(headerCell).not.toHaveAttribute("aria-sort");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
