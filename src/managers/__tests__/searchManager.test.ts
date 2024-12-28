import getSearchResults, { cache } from "../searchManager";
import { querySearch } from "../../api/moviesApi";

vi.mock("../../api/moviesApi", () => ({
  querySearch: vi.fn(),
}));

describe("searchManager", () => {
  describe("getSearchResults()", () => {
    it("returns empty array on empty query", async () => {
      let results = await getSearchResults("");
      expect(results).toEqual([]);

      results = await getSearchResults("     ", 2);
      expect(results).toEqual([]);

      expect(querySearch).toHaveBeenCalledTimes(0);
    });

    describe("fetching data", () => {
      const mockedQuerySearch = vi.mocked(querySearch);

      const mockResolvedQuery = (results: unknown[], page: number = 1) => {
        mockedQuerySearch.mockResolvedValue(
          new Promise((resolve) => {
            resolve({
              results,
              page,
              total_pages: page * 10,
              total_results: results.length > 0 ? results.length * 10 : 10,
            });
          }),
        );
      };

      afterEach(() => {
        mockedQuerySearch.mockClear();

        // Clear cache
        Object.keys(cache).forEach((key) => {
          delete cache[key];
        });
      });

      it("fetches the data of a query only once", async () => {
        mockResolvedQuery([]);

        await getSearchResults("spider man");
        expect(mockedQuerySearch).toHaveBeenCalledTimes(1);

        await getSearchResults("spider man");
        expect(mockedQuerySearch).toHaveBeenCalledTimes(1);
      });

      it("caches the query properly", async () => {
        expect(cache["spider man"]).toBeUndefined();

        mockResolvedQuery([]);
        await getSearchResults("spider man");

        expect(cache["spider man"]).toEqual({
          totalPages: 10,
          totalResults: 10,
          pages: {
            1: [],
          },
        });
      });

      it("transforms the query into array of movies", async () => {
        mockResolvedQuery([
          {
            id: 0,
            title: "Test Movie",
            original_title: "Test Movie Original",
            overview: "A test movie description",
            release_date: "2024-01-01",
            poster_path: "/poster.jpg",
            backdrop_path: "/backdrop.jpg",
          },
          {
            id: 1,
            title: "Test Movie 2",
            original_title: "Test Movie Original 2",
            overview: "A test movie description",
            release_date: "2025-01-02",
            poster_path: "/poster-1.jpg",
            backdrop_path: "/backdrop-1.jpg",
          },
        ]);

        const results = await getSearchResults("test");

        expect(results).toHaveLength(2);

        expect(cache.test).toEqual({
          totalPages: 10,
          totalResults: 20,
          pages: {
            1: [0, 1],
          },
        });
      });

      it("updates cached pages properly", async () => {
        mockResolvedQuery([
          {
            id: 0,
            title: "Test Movie",
            original_title: "Test Movie Original",
            overview: "A test movie description",
            release_date: "2024-01-01",
            poster_path: "/poster.jpg",
            backdrop_path: "/backdrop.jpg",
          },
        ]);
        await getSearchResults("test");

        mockResolvedQuery([], 2);
        await getSearchResults("test", 2);

        expect(cache.test).toEqual({
          totalPages: 10,
          totalResults: 10,
          pages: {
            1: [0],
            2: [],
          },
        });
      });
    });
  });
});
