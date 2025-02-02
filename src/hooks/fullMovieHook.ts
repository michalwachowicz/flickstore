import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie } from "../interfaces/Movie";
import {
  addBackdrops,
  getMovie,
  isFullMovie,
  setMovie as setCacheMovie,
} from "../managers/moviesManager";
import { getBackdropImages, getMovieDetails } from "../api/moviesApi";

export default function useFullMovie() {
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

  return { loading, movie, numId };
}
