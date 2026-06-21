import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renderiza o conteúdo com role=alert", () => {
    render(<Alert>Operação realizada com sucesso.</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("exibe o título quando fornecido", () => {
    render(<Alert title="Atenção">Verifique os dados.</Alert>);
    expect(screen.getByText("Atenção")).toBeInTheDocument();
    expect(screen.getByText("Verifique os dados.")).toBeInTheDocument();
  });

  it("exibe botão de fechar quando onDismiss é fornecido", async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    render(<Alert onDismiss={onDismiss}>Mensagem</Alert>);

    const closeButton = screen.getByRole("button", { name: "Fechar alerta" });
    await user.click(closeButton);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("não exibe botão de fechar quando onDismiss não é fornecido", () => {
    render(<Alert>Mensagem sem dismiss</Alert>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("aplica variante danger", () => {
    render(<Alert variant="danger">Erro crítico</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("bg-danger/10");
  });
});
