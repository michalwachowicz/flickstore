import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieInfoButton from "@/Components/button/MovieInfoButton";

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

  it.todo("routes to the proper movie page");
});
