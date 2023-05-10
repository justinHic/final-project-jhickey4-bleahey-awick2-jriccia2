import { ENERGY_LABEL_TEXT } from "@/resources/strings";
import { ChangeEvent } from "react";

/**
 * The interface for the props of the EnergyInput component.
 * @property {number} energy The energy value to display in the input.
 * @property {(energy: number) => void} setEnergy The function to call when the energy is changed.
 */
interface EnergyInputProps {
  /**
   * The energy value to display in the input.
   */
  energy: number;

  /**
   * The function to call when the energy is changed.
   * @param {number} energy The new energy value.
   * @returns {void}
   */
  setEnergy: (energy: number) => void;
}

/**
 * A component that allows the user to input an energy value between 0 and 1.
 * @param {EnergyInputProps} props The props for the EnergyInput.
 * @returns {JSX.Element} An EnergyInput component.
 */
export default function EnergyInput(props: EnergyInputProps): JSX.Element {
  return (
    <div className="number-input-container">
      <label className="number-input-label">{ENERGY_LABEL_TEXT}</label>
      <input
        type="number"
        min={0}
        max={1}
        step={0.01}
        value={props.energy}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (isNaN(parseFloat(event.target.value))) {
            return props.setEnergy(0);
          }

          let toSet: number = parseFloat(event.target.value);

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
