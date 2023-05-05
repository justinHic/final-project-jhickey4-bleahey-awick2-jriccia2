export default interface GenreOption {
  value: string;
  label: string;
}

export function createGenreOptionsFromStringArray(
  genreStrings: string[]
): GenreOption[] {
  return genreStrings.map((genreString) => ({
    value: genreString,
    label: genreString,
  }));
}
