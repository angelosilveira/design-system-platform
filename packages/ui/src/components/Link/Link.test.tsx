import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link } from "./Link";

describe("Link", () => {
  it("renderiza o texto do link como âncora", () => {
    render(<Link href="/sobre">Sobre nós</Link>);
    expect(screen.getByRole("link", { name: "Sobre nós" })).toBeInTheDocument();
  });

  it("define o href corretamente", () => {
    render(<Link href="/contato">Contato</Link>);
    expect(screen.getByRole("link", { name: "Contato" })).toHaveAttribute("href", "/contato");
  });

  it("links externos têm target=_blank e rel=noopener noreferrer", () => {
    render(<Link href="https://exemplo.com" external>Site externo</Link>);
    const link = screen.getByRole("link", { name: /Site externo/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("links externos incluem aviso acessível para leitores de tela", () => {
    render(<Link href="https://exemplo.com" external>Documentação</Link>);
    expect(screen.getByText("(abre em nova aba)")).toBeInTheDocument();
  });

  it("dispara onClick ao ser clicado", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Link href="#" onClick={handleClick}>Clique</Link>);
    await user.click(screen.getByRole("link", { name: "Clique" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
