import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "./Breadcrumb";

function renderBreadcrumb() {
  return render(
    <Breadcrumb.Root>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Início</Breadcrumb.Link>
        <Breadcrumb.Separator />
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/produtos">Produtos</Breadcrumb.Link>
        <Breadcrumb.Separator />
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Page>Camiseta Azul</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.Root>,
  );
}

describe("Breadcrumb", () => {
  it("renderiza como nav com aria-label", () => {
    renderBreadcrumb();
    expect(screen.getByRole("navigation", { name: "Navegação estrutural" })).toBeInTheDocument();
  });

  it("renderiza links com href correto", () => {
    renderBreadcrumb();
    expect(screen.getByRole("link", { name: "Início" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Produtos" })).toHaveAttribute("href", "/produtos");
  });

  it("item atual tem aria-current=page e não é link", () => {
    renderBreadcrumb();
    const currentPage = screen.getByText("Camiseta Azul");
    expect(currentPage).toHaveAttribute("aria-current", "page");
    expect(currentPage.tagName).toBe("SPAN");
  });

  it("separadores são aria-hidden", () => {
    renderBreadcrumb();
    const separators = document.querySelectorAll("[aria-hidden='true']");
    expect(separators.length).toBeGreaterThan(0);
  });
});
