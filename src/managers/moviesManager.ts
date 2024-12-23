import { ApiMovie, Movie } from "../interfaces/Movie";
import { CastMember, CrewMember } from "../interfaces/Credit";
import createCreditFromApi from "./creditsManager";

const cache: { [key: number]: Movie } = {};

const getMovie = (id: number) => cache[id];

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
    title: apiMovie.original_title || apiMovie.title,
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
    )?.id,
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

export { getMovie, setMovie };
