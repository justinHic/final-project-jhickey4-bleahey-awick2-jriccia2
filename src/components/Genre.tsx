interface GenreProps {
  genre: string;
}

export default function Genre(props: GenreProps) {
  return (
    <div className="genre-option">
      <label className="genre-option-label">{props.genre}</label>
      <button className="genre-option-button">X</button>
    </div>
  );
}
