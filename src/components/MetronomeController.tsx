import { Metronome } from "@/scripts/metronome";

/**
 * The props for the MetronomeController component.
 *
 * @property {number} tempo The tempo of the metronome.
 * @property {Metronome} metronome The metronome object.
 * @property {(tempo: number) => void} setTempo The function to set the tempo of the metronome.
 * @property {number} max The maximum tempo of the metronome.
 * @property {number} min The minimum tempo of the metronome.
 */
interface MetronomeProps {
  /**
   * The tempo of the metronome.
   */
  tempo: number;

  /**
   * The metronome object.
   */
  metronome: Metronome;

  /**
   * The function to set the tempo of the metronome.
   * @param {number} tempo The tempo to set the metronome to.
   * @returns {void}
   */
  setTempo: (tempo: number) => void;

  /**
   * The maximum tempo of the metronome.
   */
  max: number;

  /**
   * The minimum tempo of the metronome.
   */
  min: number;
}

/**
 * A component that allows the user to control the metronome.
 * @param {Metronome} props The props for the MetronomeController.
 * @returns {JSX.Element} A MetronomeController component.
 */
export function MetronomeController(props: MetronomeProps): JSX.Element {
  return (
    <div className="metronome" aria-label="metronome" aria-description="">
      <button
        className="decreaseMetronome"
        aria-label="decrease tempo"
        id="decrease-tempo"
        onClick={() => {
          if (props.tempo > props.min) {
            props.setTempo(props.tempo - 5);
            props.metronome.tempo = props.tempo - 5;
          }
        }}
      >
        <div className="incrementer-outer">
          <div className="incrementer-inner">-</div>
        </div>
      </button>
      <div className="backdiv">
        <div
          className="tempo"
          aria-label="current tempo"
          id="current-tempo"
          aria-busy
        >
          Tempo: {props.tempo}
        </div>
      </div>

      <button
        className="increaseMetronome"
        aria-label="increase tempo"
        id="increase-tempo"
        onClick={() => {
          if (props.tempo < props.max) {
            props.setTempo(props.tempo + 5);
            props.metronome.tempo = props.tempo + 5;
          }
        }}
      >
        <div className="incrementer-outer">
          <div className="incrementer-inner">+</div>
        </div>
      </button>
    </div>
  );
}
