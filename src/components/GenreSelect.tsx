import { GENRE_SELECT_PLACEHOLDER } from "@/resources/strings";
import Select, { MultiValue } from "react-select";
import SelectOption, {
  createSelectOptionsFromStringArray,
} from "../types/SelectOption";

/**
 * The props of the GenreSelect component.
 * @property {string[]} genres The genres to display in the Select element.
 * @property {string[]} selectedGenres The genres that are currently selected.
 * @property {(selectedGenres: string[]) => void} setSelectedGenres The function to call when the selected genres are changed.
 * @property {number} maxLimit The maximum number of genres that can be selected.
 */
interface GenreSelectProps {
  /**
   * The genres to display in the Select element.
   */
  genres: string[];

  /**
   * The genres that are currently selected.
   */
  selectedGenres: string[];

  /**
   * The function to call when the selected genres are changed.
   * @param {string[]} selectedGenres The new selected genres.
   * @returns {void}
   */
  setSelectedGenres: (selectedGenres: string[]) => void;

  /**
   * The maximum number of genres that can be selected.
   */
  maxLimit: number;
}

/**
 * Component for selecting genres.
 * @param {GenreSelectProps} props Props for the GenreSelect.
 * @returns {JSX.Element} A GenreSelect component.
 */
export default function GenreSelect(props: GenreSelectProps): JSX.Element {
  const genreOptions: SelectOption[] = createSelectOptionsFromStringArray(
    props.genres
  );
  const selectedOptions: (SelectOption | undefined)[] =
    props.selectedGenres.map((selectedGenre) =>
      genreOptions.find((option) => option.value === selectedGenre)
    );

  /**
   * Updates the selectedGenres prop when the value of the Select element is changed.
   *
   * @param {MultiValue<SelectOption | undefined>} newValue The new value of the Select element.
   * @returns {void}
   */
  function handleGenreChange(
    newValue: MultiValue<SelectOption | undefined>
  ): void {
    if (newValue) {
      const filteredGenres: SelectOption[] = newValue.filter(
        (item): item is SelectOption => item !== undefined
      );
      if (filteredGenres.length <= props.maxLimit) {
        const selectedStrings: string[] = filteredGenres.map(
          (selectedOption) => selectedOption.value
        );
        props.setSelectedGenres(selectedStrings);
      } else {
        alert(`You can only select up to ${props.maxLimit} genres.`);
      }
    }
  }

  return (
    <Select
      isMulti
      isSearchable
      name="genres"
      options={genreOptions}
      value={selectedOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder={GENRE_SELECT_PLACEHOLDER}
      onChange={handleGenreChange}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "#3a3a3a",
          width: "30ch",
        }),
        input: (provided) => ({
          ...provided,
          color: "white",
        }),
      }}
    />
  );
}
