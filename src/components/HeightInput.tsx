import { ChangeEvent } from "react";

/**
 * The props of the HeightInput component.
 * @property {(inches: number | undefined) => void;} setInches The function to call when the inches are changed.
 * @property {(inches: number | undefined) => void;} setFeet The function to call when the feet are changed.
 */
export interface HeightInputProps {
  /**
   * The function to call when the inches are changed.
   * @param {number | undefined} inches The new inches value.
   * @returns {void}
   */
  setInches: (inches: number | undefined) => void;

  /**
   * The function to call when the feet are changed.
   * @param {number | undefined} feet The new feet value.
   * @returns {void}
   */
  setFeet: (feet: number | undefined) => void;
}

/**
 * A component that allows the user to input their height in feet and inches.
 * @param {HeightInputProps} props The props for the HeightInput.
 * @returns {JSX.Element} A HeightInput component.
 */
export default function HeightInput(props: HeightInputProps): JSX.Element {
  return (
    <>
      <p className="height-title">Please enter your height</p>
      <div className="height-div">
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="3"
          max="8"
          className="height-input"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            props.setFeet(parseInt(event.target.value))
          }
        ></input>
        <label className="height-label">ft</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="0"
          max="11"
          className="height-input"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            props.setInches(parseInt(event.target.value))
          }
        ></input>
        <label className="height-label">in</label>
      </div>
    </>
  );
}
