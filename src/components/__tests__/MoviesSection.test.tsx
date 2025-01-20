import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MoviesSection from "@/Components/MoviesSection";
import MockMoviePage from "@/Components/mocks/MockMoviePage";

vi.mock("@/Components/carousel/Carousel", () => ({
  default: () => <div data-testid="carousel" />,
}));

describe("<MoviesSection />", () => {
  it("renders correctly", () => {
    render(<MoviesSection title="Title">test</MoviesSection>);

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
    expect(screen.queryByText(/see more/i)).not.toBeInTheDocument();
  });

  it("renders the see more button if genre is specified", () => {
    render(
      <MemoryRouter>
        <MoviesSection title="Title" genreId={1}>
          test
        </MoviesSection>
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
              <MoviesSection title="Title" genreId={1}>
                test
              </MoviesSection>
            }
          />
          <Route path="/genre/:id" element={<MockMoviePage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("movie-page")).not.toBeInTheDocument();
    expect(screen.queryByText(/1/)).not.toBeInTheDocument();

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByText(/see more/i));
    });

    expect(screen.getByTestId("movie-page")).toBeInTheDocument();
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });
});
