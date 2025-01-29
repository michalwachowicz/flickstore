import { afterEach, beforeEach, expect, MockedFunction } from "vitest";
import { ApiMovie, Movie } from "../../interfaces/Movie";
import {
  getCachedPopularMovies,
  getCachedTopRatedMovies,
  getMovie,
  isFullMovie,
  setMovie,
} from "../moviesManager";
import { getPopularMovies, getTopRatedMovies } from "../../api/moviesApi";

vi.mock("../../api/moviesApi", () => ({
  getPopularMovies: vi.fn(),
  getTopRatedMovies: vi.fn(),
}));

describe("moviesManager", () => {
  const mockApiMovie: ApiMovie = {
    id: 1,
    title: "Test Movie",
    overview: "A test movie description",
    release_date: "2024-01-01",
    poster_path: "/poster.jpg",
    backdrop_path: "/backdrop.jpg",
    runtime: 120,
    videos: {
      results: [
        { id: "vid1", site: "YouTube", name: "Test Trailer" },
        { id: "vid2", site: "Vimeo", name: "Another Video" },
      ],
    },
    genre_ids: [28, 12],
    credits: {
      cast: [
        {
          name: "Actor One",
          known_for_department: "Acting",
          profile_path: "/actor1.jpg",
          character: "Hero",
        },
      ],
      crew: [
        {
          name: "Director One",
          known_for_department: "Directing",
          profile_path: "/director1.jpg",
          job: "Director",
        },
      ],
    },
    images: {
      backdrops: ["/backdrop-2.jpg"],
    },
    similar: {
      results: [
        {
          id: 2,
          title: "Similar Movie",
          overview: "",
          genre_ids: [28],
          release_date: "2023-01-01",
          poster_path: "/poster2.jpg",
          backdrop_path: "/backdrop2.jpg",
        },
      ],
    },
  };

  const mockMovie: Movie = {
    id: 1,
    title: "Test Movie",
    releaseDate: "2024-01-01",
    images: {
      poster: "/poster.jpg",
      backdrops: ["/backdrop.jpg", "/backdrop-2.jpg"],
    },
    description: "A test movie description",
    runtime: 120,
    genres: [28, 12],
    similar: [2],
    video: "vid1",
    credits: {
      cast: [
        {
          name: "Actor One",
          department: "Acting",
          image: "/actor1.jpg",
          character: "Hero",
        },
      ],
      crew: [
        {
          name: "Director One",
          department: "Directing",
          image: "/director1.jpg",
          job: "Director",
        },
      ],
    },
  };

  describe("setMovie()", () => {
    it("adds Movie object to cache", () => {
      setMovie(0, mockMovie);
      expect(getMovie(0)).toBe(mockMovie);
    });

    it("transforms ApiMovie to Movie object and adds to cache", () => {
      setMovie(mockApiMovie.id, mockApiMovie);
      expect(getMovie(mockApiMovie.id)).toEqual(mockMovie);
    });

    it("adds similar movies to cache recursively", () => {
      setMovie(mockApiMovie.id, mockApiMovie);
      expect(getMovie(2)).toEqual({
        id: 2,
        title: "Similar Movie",
        description: "",
        releaseDate: "2023-01-01",
        images: {
          poster: "/poster2.jpg",
          backdrops: ["/backdrop2.jpg"],
        },
        similar: [],
        genres: [28],
        credits: {
          crew: [],
          cast: [],
        },
      });
    });
  });

  describe("getMovie()", () => {
    it("returns undefined if a movie is not cached", () =>
      expect(getMovie(999)).toBeUndefined());
  });

  describe("isFullMovie()", () => {
    it("returns false if movie does not exist", () => {
      expect(isFullMovie(999)).toBe(false);
    });

    it("returns false if some properties do not exist", () => {
      setMovie(3, {
        id: 3,
        title: "test",
        images: { poster: "test.jpg", backdrops: ["backdrop.jpg"] },
        description: "A test movie description",
        releaseDate: "2023-01-01",
      } as Movie);

      expect(isFullMovie(3)).toBe(false);
    });

    it("returns true if movie has all properties", () => {
      setMovie(0, mockMovie);

      expect(isFullMovie(0)).toBe(true);
    });
  });

  describe("cached functions", () => {
    const mockResults: { results: ApiMovie[] } = {
      results: [
        {
          id: 0,
          title: "Movie 1",
          overview: "",
          release_date: "2023-01-01",
          poster_path: "/poster0.jpg",
          backdrop_path: "/backdrop0.jpg",
        },
        {
          id: 1,
          title: "Movie 2",
          overview: "",
          release_date: "2023-01-01",
          poster_path: "/poster0.jpg",
          backdrop_path: "/backdrop0.jpg",
        },
      ],
    };

    const mockResolveGetter = (
      mockFn: MockedFunction<(page?: number) => Promise<unknown>>,
    ) => {
      mockFn.mockResolvedValue(
        new Promise((resolve) => {
          resolve({ ...mockResults });
        }),
      );
    };

    const testCachedFunction = (
      cachedFn: () => Promise<number[]>,
      mockedApiFn: MockedFunction<(page?: number) => Promise<unknown>>,
    ) => {
      beforeEach(() => {
        mockResolveGetter(mockedApiFn);
      });

      afterEach(() => {
        mockedApiFn.mockClear();
      });

      it("fetches data only once", async () => {
        await cachedFn();
        expect(mockedApiFn).toHaveBeenCalledTimes(1);

        await cachedFn();
        expect(mockedApiFn).toHaveBeenCalledTimes(1);
      });

      it("returns the proper value", async () => {
        const movies = await cachedFn();
        expect(movies).toEqual([0, 1]);
      });

      it("caches movies properly", async () => {
        await cachedFn();

        expect(getMovie(0)).toBeDefined();
        expect(getMovie(1)).toBeDefined();
      });
    };

    describe("getCachedPopularMovies()", () => {
      const mockedGetPopularMovies = vi.mocked(getPopularMovies);
      testCachedFunction(getCachedPopularMovies, mockedGetPopularMovies);
    });

    describe("getCachedTopRatedMovies()", () => {
      const mockedGetTopRatedMovies = vi.mocked(getTopRatedMovies);
      testCachedFunction(getCachedTopRatedMovies, mockedGetTopRatedMovies);
    });
  });
});
