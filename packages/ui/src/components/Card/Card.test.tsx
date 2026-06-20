import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renderiza título, descrição e corpo", () => {
    render(
      <Card.Root>
        <Card.Header>
          <Card.Title>Título</Card.Title>
          <Card.Description>Descrição do card</Card.Description>
        </Card.Header>
        <Card.Body>Conteúdo do corpo</Card.Body>
      </Card.Root>,
    );

    expect(screen.getByText("Título")).toBeInTheDocument();
    expect(screen.getByText("Descrição do card")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo do corpo")).toBeInTheDocument();
  });

  it("renderiza o título com a tag semântica padrão h3", () => {
    render(<Card.Title>Meu título</Card.Title>);
    expect(
      screen.getByRole("heading", { level: 3, name: "Meu título" }),
    ).toBeInTheDocument();
  });

  it("permite customizar o nível do heading via prop as", () => {
    render(<Card.Title as="h2">Título nível 2</Card.Title>);
    expect(
      screen.getByRole("heading", { level: 2, name: "Título nível 2" }),
    ).toBeInTheDocument();
  });

  it("aceita className customizada no Root", () => {
    render(<Card.Root data-testid="card" className="custom-class" />);
    expect(screen.getByTestId("card")).toHaveClass("custom-class");
  });
});
