import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import {
  CheckIcon,
  XIcon,
  ChevronDownIcon,
  AlertCircleIcon,
  SearchIcon,
} from "./Icon";

describe("Icons", () => {
  it("renderiza CheckIcon como elemento SVG", () => {
    const { container } = render(<CheckIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("aplica tamanho customizado via prop size", () => {
    const { container } = render(<CheckIcon size={32} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("é aria-hidden por padrão", () => {
    const { container } = render(<XIcon />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("aceita aria-label para uso acessível", () => {
    const { container } = render(<SearchIcon aria-label="Buscar" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-label", "Buscar");
    expect(svg).not.toHaveAttribute("aria-hidden");
  });

  it("renderiza AlertCircleIcon e ChevronDownIcon sem erros", () => {
    const { container: c1 } = render(<AlertCircleIcon />);
    const { container: c2 } = render(<ChevronDownIcon />);
    expect(c1.querySelector("svg")).toBeInTheDocument();
    expect(c2.querySelector("svg")).toBeInTheDocument();
  });
});
