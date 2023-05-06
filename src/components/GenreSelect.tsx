import Select from "react-select";
import GenreOption, {
  createGenreOptionsFromStringArray,
} from "../types/GenreOption";
import { Dispatch, SetStateAction } from "react";

interface GenreSelectProps {
  genres: string[];
  selectedGenres: GenreOption[];
  setSelectedGenres: Dispatch<SetStateAction<GenreOption[]>>;
  maxLimit: number;
}

export default function GenreSelect(
  props: GenreSelectProps
): React.ReactElement {
  const genreOptions: GenreOption[] = createGenreOptionsFromStringArray(
    props.genres
  );
  return (
    <Select
      isMulti
      isSearchable
      name="genres"
      options={genreOptions}
      defaultValue={[
        genreOptions.find((genre) => genre.value === "Classic Peruvian Pop"),
        genreOptions.find((genre) => genre.value === "Albuquerque Indie"),
        genreOptions.find((genre) => genre.value === "Scam Rap"),
      ]}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder="Select genres..."
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
