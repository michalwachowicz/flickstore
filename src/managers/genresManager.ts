import SearchQuery from "../interfaces/SearchQuery";
import { getMoviesByGenre } from "../api/moviesApi";
import { getMovie, getPageArrayFromResults } from "./moviesManager";

const genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
} as const;

export type GenreId = keyof typeof genres;

// Exported for testing only
const cache: { [key: number]: SearchQuery } = {};

const getGenre = (id: GenreId) => genres[id];

const getGenreResults = async (genreId: GenreId, page: number = 1) => {
  const cachedGenre = cache[genreId];
  const cachedResults = cachedGenre?.pages[page];

  if (!cachedGenre || !cachedResults) {
    const data = await getMoviesByGenre(genreId, page);
    const dataResults = data.results;
    const pageArr = getPageArrayFromResults(dataResults);

    if (cachedGenre) {
      cachedGenre.pages[page] = pageArr;
    } else {
      cache[genreId] = {
        totalPages: data.total_pages || 0,
        totalResults: data.total_results || 0,
        pages: {
          [page]: pageArr,
        },
      };
    }
  }

  return cache[genreId].pages[page].map((result) => getMovie(result));
};

const getGenreList = () =>
  Object.keys(genres).map((genreId) => parseInt(genreId, 10));

export { cache, getGenre, getGenreResults, getGenreList };
