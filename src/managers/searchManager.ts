import Fuse from "fuse.js";
import SearchQuery from "../interfaces/SearchQuery";
import normalizeString from "../utils/stringNormalizer";
import { querySearch } from "../api/moviesApi";
import { getMovie, getPageArrayFromResults } from "./moviesManager";

// Exported for testing only
export const cache: { [key: string]: SearchQuery } = {};

export default async function getSearchResults(
  query: string,
  page: number = 1,
) {
  const normalizedQuery = normalizeString(query);
  if (normalizedQuery === "") return [];

  const fuse = new Fuse(Object.keys(cache), {
    includeScore: true,
    threshold: 0.3,
  });
  const fuzzyMatch = fuse.search(normalizedQuery);

  const bestMatch =
    fuzzyMatch.length > 0 ? fuzzyMatch[0].item : normalizedQuery;

  const cachedSearch = cache[bestMatch];
  const cachedResults = cachedSearch?.pages[page];

  if (!cachedSearch || !cachedResults) {
    const data = await querySearch(bestMatch, page);
    const dataResults = data.results;
    const pageArr = getPageArrayFromResults(dataResults);

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

  return cache[bestMatch].pages[page].map((result) => getMovie(result));
}
