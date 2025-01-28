import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MoviesSection from "@/Components/MoviesSection";
import MockSearchPage from "@/Components/mocks/MockSearchPage";

vi.mock("@/Components/carousel/Carousel", () => ({
  default: () => <div data-testid="carousel" />,
}));

describe("<MoviesSection />", () => {
  const mockMovies = [0, 1];

  it("renders correctly", () => {
    render(<MoviesSection title="Title" movies={mockMovies} />);

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
    expect(screen.queryByText(/see more/i)).not.toBeInTheDocument();
  });

  it("renders nothing when movies array is empty", () => {
    render(<MoviesSection title="Title" movies={[]} />);

    expect(screen.queryByText("Title")).not.toBeInTheDocument();
    expect(screen.queryByTestId("carousel")).not.toBeInTheDocument();
  });

  it("renders the see more button if genre is specified", () => {
    render(
      <MemoryRouter>
        <MoviesSection title="Title" genreId={1} movies={mockMovies} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/see more/i)).toBeInTheDocument();
  });

  it("navigates to a genre page on see more button click", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <MoviesSection title="Title" genreId={1} movies={mockMovies} />
            }
          />
          <Route path="/genre/:query/:page" element={<MockSearchPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("movie-page")).not.toBeInTheDocument();
    expect(screen.queryByText(/1 1/)).not.toBeInTheDocument();

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByText(/see more/i));
    });

    expect(screen.getByTestId("search-page")).toBeInTheDocument();
    expect(screen.getByText(/1 1/)).toBeInTheDocument();
  });
});
