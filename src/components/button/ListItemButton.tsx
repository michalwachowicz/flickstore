import { Link } from "react-router-dom";
import { Movie } from "../../interfaces/Movie";
import { getImageUrl } from "../../api/moviesApi";

interface Props {
  movie: Movie;
}

const ListItemButton = ({ movie }: Props) => (
  <li>
    <Link
      to={`/movie/${movie.id}`}
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
          <div className="text-xl font-bold text-neutral-200">
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
