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

  if (params.length > 0) url += `?append_to_response=${params.join("%2C")}`;

  return requestData(url);
};

export { querySearch, getMovieDetails };
