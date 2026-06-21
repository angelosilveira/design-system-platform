import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "./Accordion";

function renderAccordion() {
  return render(
    <Accordion.Root>
      <Accordion.Item value="item1">
        <Accordion.Trigger>Seção 1</Accordion.Trigger>
        <Accordion.Content>Conteúdo 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item2">
        <Accordion.Trigger>Seção 2</Accordion.Trigger>
        <Accordion.Content>Conteúdo 2</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>,
  );
}

describe("Accordion", () => {
  it("oculta o conteúdo inicialmente (aria-expanded=false)", () => {
    renderAccordion();
    expect(screen.getByRole("button", { name: /Seção 1/ })).toHaveAttribute("aria-expanded", "false");
  });

  it("expande o item ao clicar no trigger", async () => {
    const user = userEvent.setup();
    renderAccordion();

    await user.click(screen.getByRole("button", { name: /Seção 1/ }));

    expect(screen.getByRole("button", { name: /Seção 1/ })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Conteúdo 1")).toBeVisible();
  });

  it("fecha o item ao clicar novamente no mesmo trigger", async () => {
    const user = userEvent.setup();
    renderAccordion();

    await user.click(screen.getByRole("button", { name: /Seção 1/ }));
    await user.click(screen.getByRole("button", { name: /Seção 1/ }));

    expect(screen.getByRole("button", { name: /Seção 1/ })).toHaveAttribute("aria-expanded", "false");
  });

  it("fecha o item anterior ao abrir outro", async () => {
    const user = userEvent.setup();
    renderAccordion();

    await user.click(screen.getByRole("button", { name: /Seção 1/ }));
    await user.click(screen.getByRole("button", { name: /Seção 2/ }));

    expect(screen.getByRole("button", { name: /Seção 1/ })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button", { name: /Seção 2/ })).toHaveAttribute("aria-expanded", "true");
  });

  it("aria-controls do trigger aponta para o painel region", () => {
    renderAccordion();
    const trigger = screen.getByRole("button", { name: /Seção 1/ });
    const contentId = trigger.getAttribute("aria-controls");
    expect(document.getElementById(contentId!)).toBeInTheDocument();
  });
});
