import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("associa o label ao campo via htmlFor/id", () => {
    render(<Input label="Nome completo" />);
    const input = screen.getByLabelText("Nome completo");
    expect(input).toBeInTheDocument();
  });

  it("aceita digitação do usuário", async () => {
    const user = userEvent.setup();
    render(<Input label="E-mail" />);
    const input = screen.getByLabelText("E-mail");

    await user.type(input, "teste@exemplo.com");

    expect(input).toHaveValue("teste@exemplo.com");
  });

  it("exibe a mensagem de erro com role=alert e aria-invalid", () => {
    render(<Input label="CPF" errorMessage="CPF inválido" />);
    const input = screen.getByLabelText("CPF");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("CPF inválido");
  });

  it("conecta o texto de apoio via aria-describedby quando não há erro", () => {
    render(<Input label="Senha" helperText="Mínimo de 8 caracteres" />);
    const input = screen.getByLabelText("Senha");
    const describedById = input.getAttribute("aria-describedby");

    expect(describedById).toBeTruthy();
    expect(document.getElementById(describedById!)).toHaveTextContent(
      "Mínimo de 8 caracteres",
    );
  });

  it("mostra o asterisco visual quando required=true", () => {
    render(<Input label="Nome" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });
});
