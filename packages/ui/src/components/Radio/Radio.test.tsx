import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Radio } from "./Radio";

describe("Radio", () => {
  it("renderiza os itens com labels associadas via htmlFor/id", () => {
    render(
      <Radio.Group name="cor" value="azul" onChange={vi.fn()}>
        <Radio.Item value="azul" label="Azul" />
        <Radio.Item value="verde" label="Verde" />
      </Radio.Group>,
    );
    expect(screen.getByRole("radio", { name: "Azul" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Verde" })).toBeInTheDocument();
  });

  it("marca o item cujo value corresponde ao value do grupo", () => {
    render(
      <Radio.Group name="cor" value="verde" onChange={vi.fn()}>
        <Radio.Item value="azul" label="Azul" />
        <Radio.Item value="verde" label="Verde" />
      </Radio.Group>,
    );
    expect(screen.getByRole("radio", { name: "Verde" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Azul" })).not.toBeChecked();
  });

  it("chama onChange com o value do item clicado", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Radio.Group name="cor" value="azul" onChange={handleChange}>
        <Radio.Item value="azul" label="Azul" />
        <Radio.Item value="verde" label="Verde" />
      </Radio.Group>,
    );

    await user.click(screen.getByRole("radio", { name: "Verde" }));
    expect(handleChange).toHaveBeenCalledWith("verde");
  });

  it("exibe mensagem de erro do grupo", () => {
    render(
      <Radio.Group name="cor" value="" onChange={vi.fn()} label="Cor" errorMessage="Selecione uma cor">
        <Radio.Item value="azul" label="Azul" />
      </Radio.Group>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Selecione uma cor");
  });

  it("desabilita todos os itens quando disabled=true no grupo", () => {
    render(
      <Radio.Group name="cor" value="" onChange={vi.fn()} disabled>
        <Radio.Item value="azul" label="Azul" />
        <Radio.Item value="verde" label="Verde" />
      </Radio.Group>,
    );
    expect(screen.getByRole("radio", { name: "Azul" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "Verde" })).toBeDisabled();
  });
});
