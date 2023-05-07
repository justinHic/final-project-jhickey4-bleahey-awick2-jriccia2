import Select, { MultiValue } from "react-select";
import SelectOption, {
  createSelectOptionsFromStringArray,
} from "../types/SelectOption";
import { Dispatch, SetStateAction } from "react";
import { Console } from "console";
import { getDefaultCompilerOptions } from "typescript";

interface GenreSelectProps {
  genres: string[];
  selectedGenres: string[];
  setSelectedGenres: Dispatch<SetStateAction<string[]>>;
  maxLimit: number;
}

export const defaultGenres: string[] = [
  "classic peruvian pop",
  "albuquerque indie",
  "scam rap",
];

export default function GenreSelect(
  props: GenreSelectProps
): React.ReactElement {
  const genreOptions: SelectOption[] = createSelectOptionsFromStringArray(
    props.genres
  );
  const selectedOptions: (SelectOption | undefined)[] =
    props.selectedGenres.map((selectedGenre) =>
      genreOptions.find((option) => option.value === selectedGenre)
    );

  /**
   * Updates the selectedGenres prop when the value of the Select element is changed
   *
   * @param newValue
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
      placeholder="Select genres..."
      onChange={handleGenreChange}
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
