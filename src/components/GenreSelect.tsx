import Select, { MultiValue } from "react-select";
import SelectOption, {
  createSelectOptionsFromStringArray,
} from "../types/SelectOption";
import { Dispatch, SetStateAction } from "react";

interface GenreSelectProps {
  genres: string[];
  selectedGenres: SelectOption[];
  setSelectedGenres: Dispatch<SetStateAction<SelectOption[]>>;
  maxLimit: number;
}

export default function GenreSelect(
  props: GenreSelectProps
): React.ReactElement {
  const genreOptions: SelectOption[] = createSelectOptionsFromStringArray(
    props.genres
  );
  function handleGenreChange(
    newValue: MultiValue<SelectOption | undefined>
  ): void {
    if (newValue) {
      const filteredGenres = newValue.filter(
        (item): item is SelectOption => item !== undefined
      );

      if (filteredGenres.length <= props.maxLimit) {
        props.setSelectedGenres(filteredGenres);
      } else {
        // If the user tries to select more items than the maxLimit, show an alert
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
      value={props.selectedGenres}
      defaultValue={[
        genreOptions.find((genre) => genre.value === "Classic Peruvian Pop"),
        genreOptions.find((genre) => genre.value === "Albuquerque Indie"),
        genreOptions.find((genre) => genre.value === "Scam Rap"),
      ]}
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
