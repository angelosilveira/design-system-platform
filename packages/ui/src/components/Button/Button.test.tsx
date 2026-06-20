import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renderiza o texto recebido como children", () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  it("dispara onClick ao ser clicado", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Clique</Button>);

    await user.click(screen.getByRole("button", { name: "Clique" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("fica desabilitado e não dispara onClick quando isLoading=true", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button onClick={handleClick} isLoading>
        Salvando
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Salvando" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("aplica aria-disabled quando disabled=true", () => {
    render(<Button disabled>Indisponível</Button>);
    expect(
      screen.getByRole("button", { name: "Indisponível" }),
    ).toHaveAttribute("aria-disabled", "true");
  });

  it("encaminha a ref para o elemento <button> nativo", () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });
});
