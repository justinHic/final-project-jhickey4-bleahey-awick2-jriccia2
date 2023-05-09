import { Dispatch, SetStateAction } from "react";
import Select, { SingleValue } from "react-select";
import SelectOption, {
  createSelectOptionsFromStringArray,
} from "../types/SelectOption";
import { Sex, parseSex } from "@/types/Sex";

/**
 * The props for the SexSelect component.
 * @property {Sex | undefined} sex The sex that is currently selected.
 * @property {(sex: Sex | undefined) => void;} setSex The function to set the currently selected sex.
 */
interface SexSelectProps {
  /**
   * Sex that is currently selected.
   */
  sex: Sex | undefined;

  /**
   * The function to set the currently selected sex.
   * @param {Sex | undefined} sex
   * @returns {void}
   */
  setSex: (sex: Sex | undefined) => void;
}

/**
 * A component that allows the user to select their sex.
 * @param {SexSelectProps} props The props for the SexSelect component.
 * @returns {JSX.Element} A SexSelect component.
 */
export default function SexSelect(props: SexSelectProps): JSX.Element {
  /**
   * The options for sex.
   */
  const sexOptions: SelectOption[] = createSelectOptionsFromStringArray([
    "Male",
    "Female",
    /*"intersex/other -- future implementation that would require algorithm change",*/
  ]);

  function handleSexChange(newValue: SingleValue<SelectOption>): void {
    if (newValue) {
      props.setSex(parseSex(newValue.value));
    }
  }

  return (
    <Select
      isSearchable={false}
      name="sex"
      className="basic-select"
      classNamePrefix="select"
      placeholder="Select your assigned sex"
      options={sexOptions}
      onChange={handleSexChange}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          color: "white",
          backgroundColor: "#3a3a3a",
          width: "35ch",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
      }}
    />
  );
}
