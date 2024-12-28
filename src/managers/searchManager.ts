import normalizeString from "../utils/stringNormalizer";
import SearchQuery from "../interfaces/SearchQuery";
import { querySearch } from "../api/moviesApi";
import { getMovie, setMovie } from "./moviesManager";

// Exported for testing only
export const cache: { [key: string]: SearchQuery } = {};

export default async function getSearchResults(
  query: string,
  page: number = 1,
) {
  const normalizedQuery = normalizeString(query);
  if (normalizedQuery === "") return [];

  const cachedSearch = cache[normalizedQuery];
  const cachedResults = cachedSearch?.pages[page];

  if (!cachedSearch || !cachedResults) {
    const data = await querySearch(normalizedQuery, page);
    const dataResults = data.results;
    const pageArr: number[] = [];

    if (dataResults && Array.isArray(dataResults)) {
      dataResults.forEach((result) => {
        const { id } = result;
        pageArr.push(id);

        if (!getMovie(id)) setMovie(id, result);
      });
    }

    if (cachedSearch) {
      cachedSearch.pages[page] = pageArr;
    } else {
      cache[normalizedQuery] = {
        totalPages: data.total_pages || 0,
        totalResults: data.total_results || 0,
        pages: {
          [page]: pageArr,
        },
      };
    }
  }

  return cache[normalizedQuery].pages[page].map((result) => getMovie(result));
}
