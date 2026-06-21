import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "./Tabs";

function renderTabs() {
  return render(
    <Tabs.Root defaultTab="geral">
      <Tabs.List>
        <Tabs.Trigger value="geral">Geral</Tabs.Trigger>
        <Tabs.Trigger value="avancado">Avançado</Tabs.Trigger>
        <Tabs.Trigger value="seguranca">Segurança</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="geral">Conteúdo Geral</Tabs.Content>
      <Tabs.Content value="avancado">Conteúdo Avançado</Tabs.Content>
      <Tabs.Content value="seguranca">Conteúdo Segurança</Tabs.Content>
    </Tabs.Root>,
  );
}

describe("Tabs", () => {
  it("exibe o conteúdo da tab ativa por padrão", () => {
    renderTabs();
    expect(screen.getByText("Conteúdo Geral")).toBeVisible();
  });

  it("tab ativa tem aria-selected=true", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "Geral" })).toHaveAttribute("aria-selected", "true");
  });

  it("tabs inativas têm aria-selected=false", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "Avançado" })).toHaveAttribute("aria-selected", "false");
  });

  it("muda de tab ao clicar em outro trigger", async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(screen.getByRole("tab", { name: "Avançado" }));
    expect(screen.getByText("Conteúdo Avançado")).toBeVisible();
  });

  it("tab inativa tem tabIndex=-1 (roving tabindex)", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "Avançado" })).toHaveAttribute("tabIndex", "-1");
    expect(screen.getByRole("tab", { name: "Geral" })).toHaveAttribute("tabIndex", "0");
  });
});
