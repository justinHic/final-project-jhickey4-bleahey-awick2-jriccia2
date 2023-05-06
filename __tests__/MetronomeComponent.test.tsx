import { render, screen } from "@testing-library/react";
import { MetronomeComponent } from "@/components/MetronomeComponent";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Metronome } from "@/scripts/metronome";

describe("Metronome", () => {
  it("Metronome object", async () => {
    let tempo = 100;
    function setTempo(temp: number) {
      tempo = temp;
    }
    const metronome = new Metronome(100);
    metronome.isRunning = true;
    render(
      <MetronomeComponent
        tempo={tempo}
        setTempo={setTempo}
        max={150}
        min={50}
        metronome={metronome}
      ></MetronomeComponent>
    );
    const increase = screen.getByLabelText("increase tempo");
    const decrease = screen.getByLabelText("decrease tempo");
    const tempoText = screen.getByLabelText("current tempo");
    expect(increase).toBeInTheDocument();
    expect(decrease).toBeInTheDocument();
    expect(tempoText).toBeInTheDocument();
    await userEvent.click(increase);
    expect(metronome.tempo).toBe(105);
    //starts at 100 again
    await userEvent.click(decrease);
    expect(metronome.tempo).toBe(95);
  });
});
