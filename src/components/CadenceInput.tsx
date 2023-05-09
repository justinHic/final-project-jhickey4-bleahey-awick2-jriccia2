import { CADENCE_LABEL_TEXT } from "@/resources/strings";
import { ChangeEvent } from "react";

/**
 * The props of the CadenceInput component.
 * @property {number} cadence The cadence value to display in the input.
 * @property {(cadence: number) => void} setCadence The function to call when the cadence is changed.
 */
export interface CadenceInputProps {
  /**
   * The cadence value to display in the input.
   */
  cadence: number;

  /**
   * The function to call when the cadence is changed.
   * @param {number} cadence The new cadence value.
   * @returns {void}
   */
  setCadence: (cadence: number) => void;
}

/**
 * A component that allows the user to input a running cadence.
 * @param {CadenceInputProps} props The props for the CadenceInput.
 * @returns {JSX.Element} A CadenceInput component.
 */
export default function CadenceInput(props: CadenceInputProps): JSX.Element {
  return (
    <div className="number-input-container">
      <label className="number-input-label">{CADENCE_LABEL_TEXT}</label>
      <input
        type="number"
        min={50}
        max={250}
        value={props.cadence}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          props.setCadence(parseInt(event.target.value))
        }
      />
    </div>
  );
}
