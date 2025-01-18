import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { getMovie } from "../../managers/moviesManager";
import MovieCard from "@/Components/MovieCard";
import MockMoviePage from "@/Components/mocks/MockMoviePage";

vi.mock("../../managers/moviesManager", () => ({
  getMovie: vi.fn(),
}));

vi.mock("../../api/moviesApi", () => ({
  getImageUrl: vi.fn((path: string) => path),
}));

vi.mock("@/Components/button/AddToCartButton", () => ({
  default: ({ onClick }: { onClick: () => void }) => (
    <button type="button" onClick={onClick} data-testid="btn-add-to-cart">
      Add to Cart
    </button>
  ),
}));

describe("<MovieCard />", () => {
  const mockGetMovie = vi.mocked(getMovie);

  const getFileName = (element: HTMLElement) => {
    if (!(element instanceof HTMLImageElement)) return "";

    const url = element.src;
    const parts = url.split("/");

    return parts[parts.length - 1];
  };

  beforeEach(() => {
    mockGetMovie.mockReturnValue({
      id: 0,
      title: "Test",
      releaseDate: "2025-01-01",
      images: { poster: "test.jpg", backdrops: ["/backdrop.jpg"] },
    });
  });

  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <MovieCard movieId={0} image="poster" />
      </MemoryRouter>,
    );

    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(screen.getByTestId("btn-add-to-cart")).toBeInTheDocument();
  });

  it("renders with a poster", () => {
    render(
      <MemoryRouter>
        <MovieCard movieId={0} image="poster" />
      </MemoryRouter>,
    );

    const img = screen.getByAltText(/test/i);

    expect(img).toBeInTheDocument();
    expect(getFileName(img)).toEqual("test.jpg");
  });

  it("renders with a backdrop image", () => {
    render(
      <MemoryRouter>
        <MovieCard movieId={0} image="backdrop" />
      </MemoryRouter>,
    );

    const img = screen.getByAltText(/test/i);

    expect(img).toBeInTheDocument();
    expect(getFileName(img)).toEqual("backdrop.jpg");
  });

  it("fallbacks to a poster if a backdrop image is missing", () => {
    mockGetMovie.mockReturnValueOnce({
      id: 0,
      title: "Test",
      releaseDate: "2025-01-01",
      images: { poster: "test.jpg" },
    });

    render(
      <MemoryRouter>
        <MovieCard movieId={0} image="backdrop" />
      </MemoryRouter>,
    );

    const img = screen.getByAltText(/test/i);

    expect(img).toBeInTheDocument();
    expect(getFileName(img)).toEqual("test.jpg");
  });

  it("navigates to movie page on click", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<MovieCard movieId={0} image="backdrop" />}
          />
          <Route path="/movie/:id" element={<MockMoviePage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("movie-page")).not.toBeInTheDocument();
    const user = userEvent.setup();

    await act(async () => {
      await user.click(screen.getByRole("img"));
    });

    expect(screen.getByTestId("movie-page")).toBeInTheDocument();
    expect(screen.getByText(/0/)).toBeInTheDocument();
  });

  it("does not navigate to movie page on add to cart button click", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<MovieCard movieId={0} image="backdrop" />}
          />
          <Route path="/movie/:id" element={<MockMoviePage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("movie-page")).not.toBeInTheDocument();
    const user = userEvent.setup();

    await act(async () => {
      await user.click(screen.getByTestId("btn-add-to-cart"));
    });

    expect(screen.queryByTestId("movie-page")).not.toBeInTheDocument();
    expect(screen.getByTestId("btn-add-to-cart")).toBeInTheDocument();
  });
});
