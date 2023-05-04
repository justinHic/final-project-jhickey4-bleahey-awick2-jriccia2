import { Metronome } from "@/scripts/metronome";

interface MetronomeProps {
  tempo: number;
  metronome: Metronome;
  setTempo: (tempo: number) => void;
  max: number;
  min: number;
}

export function MetronomeComponent(props: MetronomeProps) {
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
