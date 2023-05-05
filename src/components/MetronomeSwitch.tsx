import { Metronome } from "@/scripts/metronome";
import { SetStateAction } from "react";

interface MetronomeSwitchProps {
  metronome: Metronome;
  metronomePlaying: boolean;
  setMetronomePlaying: (metronomeIsPlaying: SetStateAction<boolean>) => void;
}

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
