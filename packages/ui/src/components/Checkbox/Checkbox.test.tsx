import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renderiza com label associada via htmlFor/id", () => {
    render(<Checkbox label="Aceitar termos" />);
    const checkbox = screen.getByRole("checkbox", { name: "Aceitar termos" });
    expect(checkbox).toBeInTheDocument();
  });

  it("dispara onChange ao ser clicado", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Notificações" onChange={handleChange} />);

    await user.click(screen.getByRole("checkbox", { name: "Notificações" }));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("exibe mensagem de erro com aria-invalid e role=alert", () => {
    render(<Checkbox label="Concordar" errorMessage="Campo obrigatório" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Campo obrigatório");
  });

  it("fica desabilitado quando disabled=true", () => {
    render(<Checkbox label="Desabilitado" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("exibe asterisco quando required=true", () => {
    render(<Checkbox label="Obrigatório" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });
});
