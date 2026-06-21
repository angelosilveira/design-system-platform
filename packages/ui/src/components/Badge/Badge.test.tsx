import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renderiza o texto recebido como children", () => {
    render(<Badge>Novo</Badge>);
    expect(screen.getByText("Novo")).toBeInTheDocument();
  });

  it("renderiza como elemento span", () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByText("Status").tagName).toBe("SPAN");
  });

  it("aplica variante danger via className correspondente", () => {
    render(<Badge variant="danger">Erro</Badge>);
    expect(screen.getByText("Erro")).toHaveClass("bg-danger");
  });

  it("aplica variante success", () => {
    render(<Badge variant="success">Ativo</Badge>);
    expect(screen.getByText("Ativo")).toHaveClass("bg-success");
  });

  it("aplica tamanho sm", () => {
    render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText("Small")).toHaveClass("text-xs");
  });
});
