import SelectOption, {
  createSelectOptionsFromStringArray,
} from "@/types/SelectOption";
import { Dispatch, SetStateAction } from "react";
import Select, { SingleValue } from "react-select";

interface HeartRateSelectProps {
  HRZones: string[];
  setHR: Dispatch<SetStateAction<string | undefined>>;
}

export default function HeartRateSelect(props: HeartRateSelectProps) {
  const heartRateOptions: SelectOption[] = createSelectOptionsFromStringArray(
    props.HRZones
  );

  return (
    <Select
      isClearable
      isSearchable={false}
      name="heart-rate"
      className="basic-select"
      classNamePrefix="select"
      placeholder="(Optional) Select your heart rate zone..."
      options={heartRateOptions}
      onChange={(newValue: SingleValue<SelectOption>) =>
        newValue === null ? props.setHR(undefined) : props.setHR(newValue.value)
      }
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "#3a3a3a",
          width: "30ch",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
      }}
    />
  );
}
