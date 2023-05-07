import { Dispatch, SetStateAction } from "react";
import SelectOption, {
  createSelectOptionsFromNumberArray,
} from "../types/SelectOption";
import Select, { SingleValue } from "react-select";

/**
 * The props for the NumSongsSelect component.
 * @interface
 * @property {number} min - The minimum number of songs that can be selected.
 * @property {number} max - The maximum number of songs that can be selected.
 * @property {number} numSongs - The number of songs that are currently selected.
 * @property {Dispatch<SetStateAction<number>>} setNumSongs - The function to
 * set the number of songs that are currently selected.
 */
interface NumSongsSelectProps {
  min: number;
  max: number;
  numSongs: number;
  setNumSongs: Dispatch<SetStateAction<number>>;
}

export default function NumSongsSelect(props: NumSongsSelectProps) {
  const numSongsOptions: SelectOption[] = createSelectOptionsFromNumberArray([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10, //TODO: use min and max
  ]);
  const selectedOption: SelectOption | undefined = numSongsOptions.find(
    (option) => option.value === props.numSongs.toString()
  );

  function handleNumSongsChange(newValue: SingleValue<SelectOption>) {
    if (newValue) {
      const num = parseInt(newValue.value);
      props.setNumSongs(num);
    }
  }

  return (
    <Select
      isSearchable={false}
      name="genres"
      options={numSongsOptions}
      value={selectedOption}
      className="basic-select"
      classNamePrefix="select"
      placeholder="Select number of songs..."
      onChange={handleNumSongsChange}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "#3a3a3a",
          width: "35ch",
        }),
      }}
    />
  );
}
