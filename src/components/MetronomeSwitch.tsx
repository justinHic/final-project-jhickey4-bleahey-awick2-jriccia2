import { Metronome } from "@/scripts/metronome";
import { SetStateAction } from "react";

/**
 *The props for the MetronomeSwitch component
 *
 * @param metronome - The metronome object
 * @param metronomePlaying - The boolean state of the metronome
 * @param setMetronomePlaying - The function to set the state of the metronome
 */
interface MetronomeSwitchProps {
  metronome: Metronome;
  metronomePlaying: boolean;
  setMetronomePlaying: (metronomeIsPlaying: SetStateAction<boolean>) => void;
}

/**
 * Provides a switch to turn the metronome on and off
 * @param props - The props for the MetronomeSwitch component
 * @returns The MetronomeSwitch component
 */
export default function MetronomeSwitch(props: MetronomeSwitchProps) {
  return (
    <div className="metronome-switch">
      <h3 className="switch-title">
        Metronome {props.metronomePlaying ? <>ON</> : <> OFF</>}
      </h3>
      <label className="switch">
        <input
          checked={props.metronomePlaying}
          onChange={() => {
            props.metronome.startStop();
            props.setMetronomePlaying(!props.metronomePlaying);
          }}
          aria-label="metronome switch"
          type="checkbox"
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}
