import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from "./Menu";

function renderMenu() {
  return render(
    <Menu.Root>
      <Menu.Trigger>Ações</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Editar</Menu.Item>
        <Menu.Item>Duplicar</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Excluir</Menu.Item>
      </Menu.Content>
    </Menu.Root>,
  );
}

describe("Menu", () => {
  it("não exibe o conteúdo inicialmente", () => {
    renderMenu();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("abre o menu ao clicar no trigger", async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByRole("button", { name: "Ações" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Editar" })).toBeInTheDocument();
  });

  it("fecha o menu ao pressionar Escape", async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByRole("button", { name: "Ações" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("fecha o menu ao clicar em um item", async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByRole("button", { name: "Ações" }));
    await user.click(screen.getByRole("menuitem", { name: "Editar" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("chama o onClick do item antes de fechar", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Menu.Root>
        <Menu.Trigger>Menu</Menu.Trigger>
        <Menu.Content>
          <Menu.Item onClick={handleClick}>Ação</Menu.Item>
        </Menu.Content>
      </Menu.Root>,
    );

    await user.click(screen.getByRole("button", { name: "Menu" }));
    await user.click(screen.getByRole("menuitem", { name: "Ação" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
