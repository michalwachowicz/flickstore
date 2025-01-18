import { Link } from "react-router-dom";
import { Movie } from "../../interfaces/Movie";
import { getImageUrl } from "../../api/moviesApi";

interface Props {
  movie: Movie;
  size?: "small" | "large";
}

const ListItemButton = ({ movie, size = "large" }: Props) => (
  <li>
    <Link
      to={`/movie?id=${movie.id}`}
      role="button"
      className="flex items-center gap-4"
    >
      <img
        src={getImageUrl(movie.images.poster, 92)}
        alt={`${movie.title}'s poster`}
        className="h-auto w-20 rounded"
        loading="lazy"
      />
      <div className="flex w-full items-center justify-between gap-8">
        <div>
          <div
            className={`${size === "large" ? "text-xl" : "text-lg"} font-bold text-neutral-200`}
          >
            {movie.title}
          </div>
          <div className="mt-2 text-neutral-400">
            {movie.releaseDate.split("-")[0]}
          </div>
        </div>
        <div className="text-xl font-black text-neutral-200">$19.99</div>
      </div>
    </Link>
  </li>
);

export default ListItemButton;
