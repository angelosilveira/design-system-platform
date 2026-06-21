import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renderiza como nav com aria-label=Paginação", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByRole("navigation", { name: "Paginação" })).toBeInTheDocument();
  });

  it("marca a página atual com aria-current=page", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Página 3" })).toHaveAttribute("aria-current", "page");
  });

  it("desabilita o botão anterior na primeira página", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Página anterior" })).toBeDisabled();
  });

  it("desabilita o botão próximo na última página", () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Próxima página" })).toBeDisabled();
  });

  it("chama onPageChange com a página correta ao clicar", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={handleChange} />);

    await user.click(screen.getByRole("button", { name: "Página 4" }));
    expect(handleChange).toHaveBeenCalledWith(4);
  });
});
