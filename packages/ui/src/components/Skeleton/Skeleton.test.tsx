import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renderiza com aria-hidden=true", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("aplica variante line por padrão com animate-pulse", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("aplica variante circle com rounded-full", () => {
    const { container } = render(<Skeleton variant="circle" width="40px" height="40px" />);
    expect(container.firstChild).toHaveClass("rounded-full");
  });

  it("aplica width e height via style inline", () => {
    const { container } = render(<Skeleton width="200px" height="24px" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("200px");
    expect(el.style.height).toBe("24px");
  });
});
