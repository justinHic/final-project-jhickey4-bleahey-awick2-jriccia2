interface GenreProps {
  genre: string;
  genres: string[];
  setGenre: (genres: string[]) => void;
}

export default function Genre(props: GenreProps) {
  const handleClick = () => {
    let temp = props.genres.slice();
    temp = temp.filter((x) => {
      return x !== props.genre;
    });
    props.setGenre(temp);
  };
  return (
    <div className="genre-option">
      <label className="genre-option-label">{props.genre}</label>
      <button className="genre-option-button" onClick={handleClick}>
        X
      </button>
    </div>
  );
}
