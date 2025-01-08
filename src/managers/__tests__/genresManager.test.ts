import { cache, getGenre, getGenreResults } from "../genresManager";
import { getMoviesByGenre } from "../../api/moviesApi";

vi.mock("../../api/moviesApi", () => ({
  getMoviesByGenre: vi.fn(),
}));

describe("genresManager", () => {
  describe("getGenre()", () => {
    it("returns genre name properly", () => {
      expect(getGenre(27)).toBe("Horror");
    });
  });

  describe("getGenreResults()", () => {
    const mockedQuerySearch = vi.mocked(getMoviesByGenre);

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
        delete cache[parseInt(key, 10)];
      });
    });

    it("fetches the data of a genre only once", async () => {
      mockResolvedQuery([]);

      await getGenreResults(27);
      expect(mockedQuerySearch).toHaveBeenCalledTimes(1);

      await getGenreResults(27);
      expect(mockedQuerySearch).toHaveBeenCalledTimes(1);
    });

    it("caches the results properly", async () => {
      expect(cache[27]).toBeUndefined();

      mockResolvedQuery([]);
      await getGenreResults(27);

      expect(cache[27]).toEqual({
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

      const results = await getGenreResults(27);

      expect(results).toHaveLength(2);

      expect(cache[27]).toEqual({
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
      await getGenreResults(27);

      mockResolvedQuery([], 2);
      await getGenreResults(27, 2);

      expect(cache[27]).toEqual({
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
