import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button";

const meta: Meta<typeof Modal.Root> = {
  title: "Components/Modal",
  component: Modal.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Modal.Root>;

function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir modal</Button>
      <Modal.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Confirmar exclusão</Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir este componente? Essa ação não pode ser
          desfeita.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => setIsOpen(false)}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};

function ModalSizesDemo() {
  const [openSize, setOpenSize] = useState<"sm" | "md" | "lg" | null>(null);

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={() => setOpenSize("sm")}>Pequeno</Button>
        <Button onClick={() => setOpenSize("md")}>Médio</Button>
        <Button onClick={() => setOpenSize("lg")}>Grande</Button>
      </div>
      <Modal.Root
        isOpen={openSize !== null}
        onClose={() => setOpenSize(null)}
        size={openSize ?? "md"}
      >
        <Modal.Header>Modal {openSize}</Modal.Header>
        <Modal.Body>Conteúdo de exemplo para o tamanho {openSize}.</Modal.Body>
      </Modal.Root>
    </>
  );
}

export const Sizes: Story = {
  render: () => <ModalSizesDemo />,
};
