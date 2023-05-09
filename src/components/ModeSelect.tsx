import { ChangeEvent, SetStateAction } from "react";
import { Mode } from "../types/Mode";
import { Metronome } from "@/scripts/metronome";

/**
 * The props for the ModeSelect component.
 * @interface
 * @prop {(watchMode: Mode) => void } setMode Sets the mode.
 * @prop {Metronome} metronome The metronome object.
 * @prop {boolean} metronomePlaying Whether the metronome is playing.
 * @prop {(metronomeIsPlaying: boolean) => void} setMetronomePlaying Sets whether the metronome is playing.
 */
interface ModeSelectProps {
  /**
   * Sets the mode.
   * @param {Mode} watchMode The mode to set.
   * @returns {void}
   */
  setMode: (watchMode: Mode) => void;

  /**
   * The metronome object.
   */
  metronome: Metronome;

  /**
   * Whether the metronome is playing.
   */
  metronomePlaying: boolean;

  /**
   * Sets whether the metronome is playing.
   * @param {boolean} metronomeIsPlaying Whether the metronome is playing.
   * @returns {void}
   */
  setMetronomePlaying: (metronomeIsPlaying: SetStateAction<boolean>) => void;
}

/**
 * A component that allows the user to select the mode.
 * @param props The props for the ModeSelect.
 * @returns {JSX.Element} A ModeSelect component.
 */
export default function ModeSelect(props: ModeSelectProps): JSX.Element {
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
