import { Metronome } from "@/scripts/metronome";

/**
 * The props for the MetronomeController component.
 *
 * @param tempo The tempo of the metronome.
 * @param metronome The metronome object.
 * @param setTempo The function to set the tempo.
 * @param max The maximum tempo.
 * @param min The minimum tempo.
 */
interface MetronomeProps {
  tempo: number;
  metronome: Metronome;
  setTempo: (tempo: number) => void;
  max: number;
  min: number;
}

/**
 * Provides a controller for the metronome.
 * @param props The props for the MetronomeController component.
 * @returns The MetronomeController component.
 */
export function MetronomeController(props: MetronomeProps) {
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
