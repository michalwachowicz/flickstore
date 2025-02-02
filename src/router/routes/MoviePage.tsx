import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie } from "../../interfaces/Movie";
import {
  addBackdrops,
  getMovie,
  isFullMovie,
  setMovie as setCacheMovie,
} from "../../managers/moviesManager";
import {
  getBackdropImages,
  getImageUrl,
  getMovieDetails,
} from "../../api/moviesApi";
import { GenreId, getGenre } from "../../managers/genresManager";
import Carousel from "@/Components/carousel/Carousel";
import PlayIcon from "@/Assets/images/icons/play.svg?react";
import AddToCartButton from "@/Components/button/AddToCartButton";
import SectionHeader from "@/Components/SectionHeader";
import ListItemButton from "@/Components/button/ListItemButton";

const MoviePage = () => {
  const { id } = useParams();
  const numId = parseInt(id || "-1", 10);

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const updateMovie = async () => {
      setLoading(true);

      if (numId === -1) {
        setMovie(null);
        setLoading(false);
        return;
      }

      if (isFullMovie(numId)) {
        setMovie(getMovie(numId));
        setLoading(false);
        return;
      }

      try {
        const movieDetails = await getMovieDetails(numId, {
          credits: true,
          images: true,
          similar: true,
          videos: true,
        });

        if (movieDetails.title) {
          const backdrops = await getBackdropImages(numId);

          setCacheMovie(numId, movieDetails);
          addBackdrops(numId, backdrops);
          setMovie(isFullMovie(numId) ? getMovie(numId) : null);
        } else {
          setMovie(null);
        }
      } catch (err) {
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    updateMovie();
  }, [numId]);

  if (loading) return <div>Loading...</div>;
  if (numId === -1 || !movie) throw new Error(`No movie found: ${id}`);

  return (
    <div className="wrapper">
      <div>
        <h1 className="text-3xl font-bold text-neutral-200">{movie.title}</h1>
        <div className="mt-4 flex items-center gap-3.5 text-neutral-300">
          {movie.releaseDate.split("-")[0]}
          <div className="h-2 w-2 rounded-full bg-neutral-300" />
          {movie.runtime}m
        </div>
      </div>
      {movie.images.backdrops && (
        <div className="mt-6">
          <Carousel visibleCount={1}>
            {movie.images.backdrops.map((backdrop, index) =>
              index === 0 && movie.video ? (
                <a
                  href={`https://youtube.com/watch?v=${movie.video}`}
                  key={backdrop}
                  className="relative block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={getImageUrl(backdrop)}
                    alt=""
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 text-xl font-bold text-neutral-50">
                    <div className="relative rounded-full border-2 border-neutral-50">
                      <PlayIcon className="relative z-10 h-10 w-10 p-1 [&>path]:fill-neutral-50" />
                      <div className="absolute inset-0 bg-neutral-950 opacity-25" />
                    </div>
                    Play trailer on YouTube
                  </div>
                </a>
              ) : (
                <img
                  key={backdrop}
                  src={getImageUrl(backdrop)}
                  alt=""
                  className="h-full w-full rounded-lg object-cover"
                />
              ),
            )}
          </Carousel>
        </div>
      )}
      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex-1">
          <p className="text-neutral-200">{movie.description}</p>
          {movie.genres && (
            <ul className="mt-4 flex gap-4 overflow-x-scroll">
              {movie.genres.map((genre) => (
                <li
                  key={genre}
                  className="flex-shrink-0 rounded-lg border border-neutral-200 px-4 py-2 text-neutral-200"
                >
                  {getGenre(genre as GenreId)}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="sm:w-40 sm:flex-grow-0 [&>button]:w-full">
          <AddToCartButton movieId={numId} />
        </div>
      </div>
      {movie.credits && movie.credits.cast.length > 0 && (
        <section className="mt-10">
          <SectionHeader title="Cast" route={`/cast/${movie.id}`} />
          <Carousel visibleCount={{ sm: 2, md: 4, lg: 6 }}>
            {movie.credits.cast
              .filter((crew) => crew.image)
              .slice(0, 12)
              .map((crew) => (
                <div
                  key={crew.name}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <img
                    src={getImageUrl(crew.image!)}
                    alt={crew.name}
                    className="rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-neutral-200">
                      {crew.name}
                    </h3>
                    <div className="mt-2 text-neutral-400">
                      {crew.character}
                    </div>
                  </div>
                </div>
              ))}
          </Carousel>
        </section>
      )}
      {movie.similar && movie.similar.length > 0 && (
        <section className="mt-10">
          <SectionHeader title="Similar movies" />
          <ul className="grid gap-6 md:grid-cols-2">
            {movie.similar.slice(0, 4).map((similar) => (
              <ListItemButton movie={getMovie(similar)} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default MoviePage;
