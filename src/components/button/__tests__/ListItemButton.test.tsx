import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ListItemButton from "@/Components/button/ListItemButton";
import MockMoviePage from "@/Components/mocks/MockMoviePage";

describe("<ListItemButton />", () => {
  const movie = {
    id: 0,
    title: "Test",
    releaseDate: "2025-01-01",
    images: { poster: "/test" },
  };

  it("renders properly", () => {
    render(
      <MemoryRouter>
        <ListItemButton movie={movie} />
      </MemoryRouter>,
    );

    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAccessibleName(`${movie.title}'s poster`);

    expect(screen.getByText(movie.title)).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();
  });

  it("routes to the proper movie page", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/movie/:id" element={<MockMoviePage />} />
          <Route path="/" element={<ListItemButton movie={movie} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("movie-page")).not.toBeInTheDocument();
    const user = userEvent.setup();

    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    expect(screen.getByTestId("movie-page")).toBeInTheDocument();
    expect(screen.getByText(/0/)).toBeInTheDocument();
  });
});
