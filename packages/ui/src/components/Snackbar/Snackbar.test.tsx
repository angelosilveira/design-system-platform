import { describe, expect, it, vi } from "vitest";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnackbarProvider, useSnackbar } from "./Snackbar";

function TriggerButton({
  message = "Salvo com sucesso",
}: {
  message?: string;
}) {
  const { showSnackbar } = useSnackbar();
  return <button onClick={() => showSnackbar(message)}>Disparar</button>;
}

describe("Snackbar", () => {
  it("lança erro ao usar useSnackbar fora do Provider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderHook(() => useSnackbar())).toThrow(
      "useSnackbar deve ser usado dentro de <SnackbarProvider>",
    );

    consoleSpy.mockRestore();
  });

  it("exibe a notificação após chamar showSnackbar", async () => {
    const user = userEvent.setup();
    render(
      <SnackbarProvider>
        <TriggerButton />
      </SnackbarProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Disparar" }));

    expect(await screen.findByText("Salvo com sucesso")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("remove a notificação ao clicar no botão de fechar", async () => {
    const user = userEvent.setup();
    render(
      <SnackbarProvider>
        <TriggerButton />
      </SnackbarProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Disparar" }));
    expect(await screen.findByText("Salvo com sucesso")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Fechar notificação" }),
    );

    await waitFor(() => {
      expect(screen.queryByText("Salvo com sucesso")).not.toBeInTheDocument();
    });
  });
});
