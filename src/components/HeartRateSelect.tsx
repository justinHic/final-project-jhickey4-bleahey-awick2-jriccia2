import SelectOption, {
  createSelectOptionsFromStringArray,
} from "@/types/SelectOption";
import Select, { SingleValue } from "react-select";

/**
 * The props of the HeartRateSelect component.
 * @property {string[]} HRZones The heart rate zones to display in the Select element.
 * @property {(HRZone: string | undefined) => void} setHR The function to call when the heart rate zone is changed.
 */
interface HeartRateSelectProps {
  /**
   * The heart rate zones to display in the Select element.
   */
  HRZones: string[];

  /**
   * The function to call when the heart rate zone is changed.
   * @param {string | undefined} HRZone The new heart rate zone.
   * @returns {void}
   */
  setHR: (HRZone: string | undefined) => void;
}

/**
 * Component for selecting heart rate zones.
 * @param {HeartRateSelectProps} props The props for the HeartRateSelect.
 * @returns {JSX.Element} A HeartRateSelect component.
 */
export default function HeartRateSelect(
  props: HeartRateSelectProps
): JSX.Element {
  /**
   * The options to display in the Select element.
   */
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
