import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

function ControlledModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <button>Abrir gatilho</button>
      <Modal.Root isOpen={isOpen} onClose={onClose}>
        <Modal.Header>Título do Modal</Modal.Header>
        <Modal.Body>Conteúdo</Modal.Body>
        <Modal.Footer>
          <button>Confirmar</button>
        </Modal.Footer>
      </Modal.Root>
    </>
  );
}

describe("Modal", () => {
  it("não renderiza nada quando isOpen=false", () => {
    render(<ControlledModal isOpen={false} onClose={() => {}} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renderiza com role=dialog e aria-modal quando isOpen=true", () => {
    render(<ControlledModal isOpen onClose={() => {}} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("Título do Modal")).toBeInTheDocument();
  });

  it("chama onClose ao pressionar Escape", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(<ControlledModal isOpen onClose={handleClose} />);

    await user.keyboard("{Escape}");

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("chama onClose ao clicar no botão de fechar do header", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(<ControlledModal isOpen onClose={handleClose} />);

    await user.click(screen.getByRole("button", { name: "Fechar" }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("prende o foco dentro do modal ao abrir (foca o primeiro elemento focável)", () => {
    render(<ControlledModal isOpen onClose={() => {}} />);
    expect(screen.getByRole("button", { name: "Fechar" })).toHaveFocus();
  });
});
