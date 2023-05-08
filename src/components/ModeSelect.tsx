import { ChangeEvent, SetStateAction } from "react";
import { Mode } from "../types/Mode";
import { Metronome } from "@/scripts/metronome";

/**
 * The props for the ModeSelect component.
 * @interface
 * @prop {(watchMode: SetStateAction<Mode>) => void } setMode - Sets the mode.
 * @prop {Metronome} metronome - The metronome object.
 * @prop {boolean} metronomePlaying - Whether the metronome is playing.
 * @prop {(metronomeIsPlaying: SetStateAction<boolean>) => void} setMetronomePlaying - Sets whether the metronome is playing.
 */
interface ModeSelectProps {
  setMode: (watchMode: SetStateAction<Mode>) => void;
  metronome: Metronome;
  metronomePlaying: boolean;
  setMetronomePlaying: (metronomeIsPlaying: SetStateAction<boolean>) => void;
}

/**
 * Creates a component for selecting the mode.
 * @param props - The props for the component.
 * @returns The mode select component.
 */
export default function ModeSelect(props: ModeSelectProps): React.ReactElement {
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
