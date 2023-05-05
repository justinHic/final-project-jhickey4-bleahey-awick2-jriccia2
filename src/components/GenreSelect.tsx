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

export default function GenreSelect(props: GenreSelectProps) {
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      !selectedGenres.includes(event.target.value) &&
      selectedGenres.length < 5
    ) {
      const copy = selectedGenres.slice();
      copy.push(event.target.value);
      setSelectedGenres(copy);
    } else if (selectedGenres.length >= 5) {
      alert("Can only select a maximum of 5 genres");
    }
  };

  const genreOptions: GenreOption[] = createGenreOptionsFromStringArray(
    props.genres
  );
  return (
    <Select
      isMulti
      name="genres"
      options={genreOptions}
      value={props.selectedGenres}
      defaultValue={[
        genreOptions.find((genre) => genre.value === "Classic Peruvian Pop"),
        genreOptions.find((genre) => genre.value === "Albuquerque Indie"),
        genreOptions.find((genre) => genre.value === "Scam Rap"),
      ]}
      className="basic-multi-select"
      isOptionDisabled={() => props.selectedGenres.length >= props.maxLimit}
      classNamePrefix="select"
    />
  );
}
