import { Metronome } from "@/scripts/metronome";

/**
 * The props for the MetronomeSwitch component.
 * @property {Metronome} metronome The metronome object.
 * @property {boolean} metronomePlaying Whether or not the metronome is playing.
 * @property {(metronomeIsPlaying: boolean) => void} setMetronomePlaying The function to set the metronome playing state.
 */
interface MetronomeSwitchProps {
  /**
   * The metronome object.
   */
  metronome: Metronome;

  /**
   * Whether or not the metronome is playing.
   */
  metronomePlaying: boolean;

  /**
   * The function to set the metronome playing state.
   * @param metronomeIsPlaying Whether or not the metronome is playing.
   * @returns {void}
   */
  setMetronomePlaying: (metronomeIsPlaying: boolean) => void;
}

/**
 * A component that allows the user to turn the metronome on and off.
 * @param props The props for the MetronomeSwitch component.
 * @returns {JSX.Element} A MetronomeSwitch component.
 */
export default function MetronomeSwitch(
  props: MetronomeSwitchProps
): JSX.Element {
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
