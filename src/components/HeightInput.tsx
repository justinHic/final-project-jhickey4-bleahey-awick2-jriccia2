import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface HeightInputProps {
  setInches: Dispatch<SetStateAction<number | undefined>>;
  setFeet: Dispatch<SetStateAction<number | undefined>>;
}

export default function HeightInput(props: HeightInputProps) {
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
