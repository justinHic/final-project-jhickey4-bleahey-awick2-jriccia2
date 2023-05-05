interface GenreOption {
  value: string;
  label: string;
}

function createGenreOptionsFromStringArray(
  genreStrings: string[]
): GenreOption[] {
  return genreStrings.map((genreString) => ({
    value: genreString,
    label: genreString,
  }));
}
