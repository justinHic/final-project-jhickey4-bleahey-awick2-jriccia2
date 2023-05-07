import { Dispatch, SetStateAction } from "react";
import Select, { SingleValue } from "react-select";
import SelectOption, {
  createSelectOptionsFromStringArray,
} from "../types/SelectOption";

interface SexSelectProps {
  sex: string | undefined;
  setSex: Dispatch<SetStateAction<string | undefined>>;
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
      props.setSex(newValue.value);
    }
  }

  return (
    <Select
      isSearchable={false}
      name="sex-select"
      placeholder="Select your assigned sex"
      onChange={handleSexChange}
    />
  );
}