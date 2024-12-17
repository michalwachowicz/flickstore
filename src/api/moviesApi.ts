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

const getMovieDetails = async (id: number) =>
  requestData(
    `/movie/${id}?append_to_response=credits%2Cimages%2Cvideos%2Csimilar&language=en-US`,
  );

export { querySearch, getMovieDetails };
