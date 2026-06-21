import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("mostra o placeholder quando nenhuma data está selecionada", () => {
    render(
      <DatePicker
        label="Data de nascimento"
        value={null}
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("Selecione uma data")).toBeInTheDocument();
  });

  it("abre o calendário ao clicar no trigger", async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        label="Data de nascimento"
        value={null}
        onChange={() => {}}
      />,
    );

    await user.click(
      screen.getByRole("combobox", { name: "Data de nascimento" }),
    );

    expect(
      screen.getByRole("combobox", { name: "Data de nascimento" }),
    ).toBeInTheDocument();
  });

  it("seleciona o dia de hoje e chama onChange com a data correta", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DatePicker
        label="Data de nascimento"
        value={null}
        onChange={handleChange}
      />,
    );

    await user.click(
      screen.getByRole("combobox", { name: "Data de nascimento" }),
    );

    const todayCell = screen.getByRole("button", { current: "date" });
    await user.click(todayCell);

    expect(handleChange).toHaveBeenCalledTimes(1);
    const selectedDate = handleChange.mock.calls[0][0] as Date;
    expect(selectedDate.toDateString()).toBe(new Date().toDateString());
  });

  it("fecha o calendário após selecionar uma data", async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        label="Data de nascimento"
        value={null}
        onChange={() => {}}
      />,
    );

    await user.click(
      screen.getByRole("combobox", { name: "Data de nascimento" }),
    );
    const todayCell = screen.getByRole("button", { current: "date" });
    await user.click(todayCell);

    expect(
      screen.queryByRole("application", { name: "Calendário" }),
    ).not.toBeInTheDocument();
  });
});
