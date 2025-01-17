import { getImageUrl } from "../../api/moviesApi";
import { getMovie } from "../../managers/moviesManager";
import AddToCartButton from "@/Components/button/AddToCartButton";
import MovieInfoButton from "@/Components/button/MovieInfoButton";

interface Props {
  movieId: number;
  backdropWidth: number;
}

const HeroCard = ({ movieId, backdropWidth }: Props) => {
  const movie = getMovie(movieId);
  const backdrop = movie.images.backdrops ? movie.images.backdrops[0] : null;
  const backdropClass = "shadow-innerBig absolute inset-0 shadow-neutral-950";

  return (
    <>
      {backdrop && (
        <div className="relative z-10 max-h-96">
          <div className={backdropClass} />
          <img
            className="max-h-96 w-full object-cover"
            src={getImageUrl(backdrop, backdropWidth)}
            alt={`${movie.title}'s backdrop`}
            loading="lazy"
          />
        </div>
      )}
      <div className="px-6 pb-4 pt-12">
        <h2 className="mb-3 text-2xl font-bold text-neutral-50">
          {movie.title}
        </h2>
        <div className="flex items-center gap-4">
          <AddToCartButton movieId={movieId} />
          <MovieInfoButton movieId={movieId} />
        </div>
      </div>
    </>
  );
};

export default HeroCard;
