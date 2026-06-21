import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Typography } from "./Typography";

describe("Typography", () => {
  it("Heading renderiza como h2 por padrão com o texto correto", () => {
    render(<Typography.Heading>Título principal</Typography.Heading>);
    expect(screen.getByRole("heading", { level: 2, name: "Título principal" })).toBeInTheDocument();
  });

  it("Heading respeita a prop as para mudar o nível semântico", () => {
    render(<Typography.Heading as="h1">H1</Typography.Heading>);
    expect(screen.getByRole("heading", { level: 1, name: "H1" })).toBeInTheDocument();
  });

  it("Text renderiza como parágrafo por padrão", () => {
    render(<Typography.Text>Parágrafo de texto</Typography.Text>);
    const el = screen.getByText("Parágrafo de texto");
    expect(el.tagName).toBe("P");
  });

  it("Caption renderiza como span com classe text-xs", () => {
    render(<Typography.Caption>Legenda</Typography.Caption>);
    const el = screen.getByText("Legenda");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveClass("text-xs");
  });
});
