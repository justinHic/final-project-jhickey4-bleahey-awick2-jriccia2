import { Dispatch, SetStateAction } from "react";

export interface HeightInputProps {
  setInches: Dispatch<SetStateAction<Number>>;
  setFeet: Dispatch<SetStateAction<Number>>;
}
