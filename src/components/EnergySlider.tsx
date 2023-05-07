import { Dispatch, SetStateAction } from "react";

interface EnergySliderProps {
  energy: number;
  setEnergy: Dispatch<SetStateAction<number>>;
}

export default function EnergySlider(props: EnergySliderProps) {
  return (
    <div className="number-input-container">
      <label className="number-input-label">Energy:</label>
      <input
        type="number"
        min={0}
        max={1}
        step={0.01}
        value={props.energy}
        onChange={(e) => {
          let toSet: number = parseFloat(e.target.value);

          if (toSet > 1) {
            toSet = 1;
          } else if (toSet < 0) {
            toSet = 0;
          }
          return props.setEnergy(toSet);
        }}
      />
    </div>
  );
}
