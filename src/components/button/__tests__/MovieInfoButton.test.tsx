import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MovieInfoButton from "@/Components/button/MovieInfoButton";
import MockMoviePage from "./MockMoviePage";

describe("<MovieInfoButton />", () => {
  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <MovieInfoButton movieId={0} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: /movie info/i }),
    ).toBeInTheDocument();
  });

  it("routes to the proper movie page", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/movie/:id" element={<MockMoviePage />} />
          <Route path="/" element={<MovieInfoButton movieId={1} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("movie-page")).not.toBeInTheDocument();
    const user = userEvent.setup();

    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    expect(screen.getByTestId("movie-page")).toBeInTheDocument();
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });
});
