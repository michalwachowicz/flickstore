import { ApiMovie, Movie } from "../interfaces/Movie";
import { CastMember, CrewMember } from "../interfaces/Credit";
import createCreditFromApi from "./creditsManager";
import { getPopularMovies, getTopRatedMovies } from "../api/moviesApi";

const cache: { [key: number]: Movie } = {};

let popularMovies: number[] = [];
let topRatedMovies: number[] = [];

const getMovie = (id: number) => cache[id];

const isFullMovie = (id: number) => {
  const movie = cache[id];
  if (!movie) return false;

  return (
    movie.description !== undefined &&
    movie.runtime !== undefined &&
    movie.genres !== undefined &&
    movie.genres.length > 0 &&
    movie.similar !== undefined &&
    movie.similar.length > 0 &&
    movie.video !== undefined &&
    movie.credits !== undefined &&
    movie.credits.cast.length > 0 &&
    movie.credits.crew.length > 0
  );
};

const isMovie = (movie: unknown): movie is Movie =>
  typeof movie === "object" && movie !== null && !("overview" in movie);

const createMovieFromApi = (apiMovie: ApiMovie): Movie => {
  const similar = apiMovie.similar?.results;
  const similarIds: number[] = [];

  if (similar || Array.isArray(similar)) {
    similar.forEach((mov) => {
      const { id } = mov;

      similarIds.push(id);
      if (!getMovie(id)) cache[id] = createMovieFromApi(mov);
    });
  }

  return {
    id: apiMovie.id,
    title: apiMovie.title,
    releaseDate: apiMovie.release_date,
    images: {
      poster: apiMovie.poster_path,
      backdrops: [
        apiMovie.backdrop_path,
        ...(apiMovie.images?.backdrops || []),
      ],
    },
    description: apiMovie.overview,
    runtime: apiMovie.runtime,
    video: (
      apiMovie.videos?.results.find(
        ({ site, name }) =>
          site === "YouTube" && name.toLowerCase().includes("trailer"),
      ) || apiMovie.videos?.results[0]
    )?.key,
    genres:
      apiMovie.genre_ids || apiMovie.genres?.map((genre) => genre.id) || [],
    similar: similarIds,
    credits: {
      crew:
        (apiMovie.credits?.crew?.map((member) =>
          createCreditFromApi(member),
        ) as CrewMember[]) || [],
      cast:
        (apiMovie.credits?.cast?.map((member) =>
          createCreditFromApi(member),
        ) as CastMember[]) || [],
    },
  };
};

const setMovie = (id: number, movie: Movie | ApiMovie) => {
  cache[id] = isMovie(movie) ? movie : createMovieFromApi(movie);
};

const getPageArrayFromResults = (results: ApiMovie[]) => {
  const arr: number[] = [];

  if (results && Array.isArray(results)) {
    results.forEach((result) => {
      const { id } = result;
      arr.push(id);

      if (!getMovie(id)) setMovie(id, result);
    });
  }

  return arr;
};

const getCachedPopularMovies = async () => {
  if (popularMovies.length > 0) return popularMovies;

  const data = await getPopularMovies();
  const dataResults = data.results;

  popularMovies = getPageArrayFromResults(dataResults);

  return popularMovies;
};

const getCachedTopRatedMovies = async () => {
  if (topRatedMovies.length > 0) return topRatedMovies;

  const data = await getTopRatedMovies();
  const dataResults = data.results;

  topRatedMovies = getPageArrayFromResults(dataResults);

  return topRatedMovies;
};

const addBackdrops = (
  id: number,
  response: { backdrops: { file_path: string }[] },
) => {
  if (!cache[id]) return;

  const { backdrops } = response;
  if (backdrops.length === 0) return;

  cache[id].images.backdrops = backdrops.map((backdrop) => backdrop.file_path);
};

export {
  getMovie,
  setMovie,
  getPageArrayFromResults,
  getCachedPopularMovies,
  getCachedTopRatedMovies,
  isFullMovie,
  addBackdrops,
};
