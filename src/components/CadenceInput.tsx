import { Dispatch, SetStateAction } from "react";

export interface CadenceInputProps {
  cadence: number;
  setCadence: Dispatch<SetStateAction<number>>;
}

export default function CadenceInput(props: CadenceInputProps) {
  return (
    <div className="number-input-container">
      <label className="number-input-label">Cadence:</label>
      <input
        type="number"
        min={50}
        max={250}
        value={props.cadence}
        onChange={(e) => props.setCadence(parseInt(e.target.value))}
      />
    </div>
  );
}
