import { ApiMovie, Movie } from "../../interfaces/Movie";
import { getMovie, setMovie } from "../moviesManager";

describe("moviesManager", () => {
  const mockApiMovie: ApiMovie = {
    id: 1,
    title: "Test Movie",
    original_title: "Test Movie Original",
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
          original_title: "Similar Movie Original",
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
    title: "Test Movie Original",
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
        title: "Similar Movie Original",
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
});
