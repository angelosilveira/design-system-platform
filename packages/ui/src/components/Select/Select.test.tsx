import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select, type SelectOption } from "./Select";

const options: SelectOption[] = [
  { label: "Pix", value: "pix" },
  { label: "Boleto", value: "boleto" },
  { label: "Cartão", value: "cartao" },
];

describe("Select", () => {
  it("mostra o placeholder quando nenhum valor está selecionado", () => {
    render(
      <Select
        label="Pagamento"
        options={options}
        value={null}
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("Selecione...")).toBeInTheDocument();
  });

  it("mostra o label da opção selecionada", () => {
    render(
      <Select
        label="Pagamento"
        options={options}
        value="pix"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("Pix")).toBeInTheDocument();
  });

  it("abre a lista de opções ao clicar no trigger", async () => {
    const user = userEvent.setup();
    render(
      <Select
        label="Pagamento"
        options={options}
        value={null}
        onChange={() => {}}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Pagamento" }));

    expect(screen.getByText("Boleto")).toBeInTheDocument();
    expect(screen.getByText("Cartão")).toBeInTheDocument();
  });

  it("chama onChange com o value correto ao clicar em uma opção", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select
        label="Pagamento"
        options={options}
        value={null}
        onChange={handleChange}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Pagamento" }));
    await user.click(screen.getByText("Boleto"));

    expect(handleChange).toHaveBeenCalledWith("boleto");
  });

  it("exibe mensagem de erro com role=alert quando errorMessage é passado", () => {
    render(
      <Select
        label="Pagamento"
        options={options}
        value={null}
        onChange={() => {}}
        errorMessage="Selecione uma opção"
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Selecione uma opção");
  });
});
