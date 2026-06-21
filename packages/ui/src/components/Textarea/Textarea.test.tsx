import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renderiza com label associada via htmlFor/id", () => {
    render(<Textarea label="Descrição" />);
    expect(screen.getByRole("textbox", { name: "Descrição" })).toBeInTheDocument();
  });

  it("aceita digitação do usuário", async () => {
    const user = userEvent.setup();
    render(<Textarea label="Comentário" />);
    const textarea = screen.getByRole("textbox", { name: "Comentário" });

    await user.type(textarea, "Olá mundo");
    expect(textarea).toHaveValue("Olá mundo");
  });

  it("exibe mensagem de erro com aria-invalid e role=alert", () => {
    render(<Textarea label="Bio" errorMessage="Muito longo" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Muito longo");
  });

  it("exibe helperText quando não há erro", () => {
    render(<Textarea label="Notas" helperText="Máximo 500 caracteres" />);
    expect(screen.getByText("Máximo 500 caracteres")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("encaminha a ref para o elemento <textarea> nativo", () => {
    const ref = vi.fn();
    render(<Textarea label="Ref" ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement));
  });
});
