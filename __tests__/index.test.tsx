// __tests__/index.test.jsx

import { render, screen } from "@testing-library/react";
import Home from "../src/pages/index";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Home", () => {
  it("test metronome", async () => {
    render(<Home />);
    const metroSwitch = screen.getByLabelText("metronome switch");
    const increase = screen.getByLabelText("increase tempo");
    const decrease = screen.getByLabelText("decrease tempo");
    const tempoText = screen.getByLabelText("current tempo");
    expect(increase).toBeInTheDocument();
    expect(decrease).toBeInTheDocument();
    expect(tempoText).toBeInTheDocument();
    expect(metroSwitch).toBeInTheDocument();
    expect(tempoText).toHaveTextContent("Tempo: OFF");
    await userEvent.click(increase);
    expect(tempoText).toHaveTextContent("Tempo: OFF");
    //starts at 100 again
    await userEvent.click(decrease);
    expect(tempoText).toHaveTextContent("Tempo: OFF");
  });
});
