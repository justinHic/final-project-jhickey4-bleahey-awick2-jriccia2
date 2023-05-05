import { ChangeEvent, SetStateAction } from "react";
import { Mode } from "../types/Mode";
import { Metronome } from "@/scripts/metronome";

interface ModeSelectProps {
  setMode: (watchMode: SetStateAction<Mode>) => void;
  metronome: Metronome;
  metronomePlaying: boolean;
  setMetronomePlaying: (metronomeIsPlaying: SetStateAction<boolean>) => void;
}

export default function ModeSelect(props: ModeSelectProps) {
  return (
    <select
      name="mode"
      defaultValue={"standard"}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "watch") {
          props.setMode(Mode.Watch);
          if (props.metronomePlaying) {
            props.metronome.startStop();
            props.setMetronomePlaying(!props.metronomePlaying);
          }
        } else {
          props.setMode(Mode.Standard);
        }
      }}
      className="dropdown hvr-grow"
    >
      <option value={Mode.Standard}>Standard mode</option>
      <option value={Mode.Watch}>Watch mode</option>
    </select>
  );
}
