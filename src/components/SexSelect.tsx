import { Dispatch, SetStateAction } from "react";
import Select, { SingleValue } from "react-select";
import SelectOption, {
  createSelectOptionsFromStringArray,
} from "../types/SelectOption";
import { Sex, parseSex } from "@/types/Sex";

interface SexSelectProps {
  sex: Sex | undefined;
  setSex: Dispatch<SetStateAction<Sex | undefined>>;
}

export default function SexSelect(props: SexSelectProps) {
  const sexOptions: SelectOption[] = createSelectOptionsFromStringArray([
    "Male",
    "Female",
    /*"other -- future implementation that would require algorithm change",*/
  ]);

  const selectedOption: SelectOption | undefined = sexOptions.find(
    (option) => option.value === props.sex
  );

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
          minWidth: "30ch",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
      }}
    />
  );
}
