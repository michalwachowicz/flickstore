import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ListItemButton from "@/Components/button/ListItemButton";

describe("<ListItemButton />", () => {
  it("renders properly", () => {
    const movie = {
      id: 0,
      title: "Test",
      releaseDate: "2025-01-01",
      images: { poster: "/test" },
    };

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

  it.todo("routes to the proper movie page");
});
