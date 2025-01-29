const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const BASE_URL = "https://api.themoviedb.org/3";

const requestData = async (url: string) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (err) {
    return err;
  }
};

const querySearch = async (query: string, page: number = 1) =>
  requestData(
    `/search/movie?query=${query.replace(" ", "%20")}&include_adult=false&language=en-US&page=${page}`,
  );

const getMovieDetails = async (
  id: number,
  options?: {
    credits?: boolean;
    images?: boolean;
    videos?: boolean;
    similar?: boolean;
  },
) => {
  let url = `/movie/${id}?language=en-US`;
  const params: string[] = [];

  if (options?.credits) params.push("credits");
  if (options?.images) params.push("images");
  if (options?.videos) params.push("videos");
  if (options?.similar) params.push("similar");

  if (params.length > 0) url += `&append_to_response=${params.join("%2C")}`;

  return requestData(url);
};

/*
Supported Image Sizes:
- Poster: w92, w154, w185, w342, w500, w780, original
- Backdrop: w300, w780, w1280, original
- Still: w92, w185, w300, original
- Profile: w45, w185, w632, original
- Logo: w45, w92, w154, w185, w300, w500, original
 */
const getImageUrl = (path: string, size: string | number = "original") =>
  `https://image.tmdb.org/t/p/${typeof size === "number" ? `w${size}` : size}/${path}`;

const getMoviesByGenre = async (id: number, page: number = 1) =>
  requestData(
    `/discover/movie?with_genres=${id}&page=${page}&language=en-US&sort_by=popularity.desc`,
  );

const getPopularMovies = async (page: number = 1) =>
  requestData(`/movie/popular?language=en-US&page=${page}`);

const getTopRatedMovies = async (page: number = 1) =>
  requestData(`/movie/top_rated?language=en-US&page=${page}`);

export {
  querySearch,
  getMovieDetails,
  getImageUrl,
  getMoviesByGenre,
  getPopularMovies,
  getTopRatedMovies,
};
