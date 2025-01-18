import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import Hero from "@/Components/hero/Hero";
import useWindowSize from "../../../hooks/windowSize";

vi.mock("@/Components/carousel/Carousel", () => ({
  default: ({ children }: { children: ReactNode[] }) => (
    <div data-testid="carousel">{children}</div>
  ),
}));

vi.mock("@/Components/hero/HeroCard", () => ({
  default: ({
    movieId,
    backdropWidth,
  }: {
    movieId: number;
    backdropWidth: number;
  }) => (
    <div data-testid={`hero-card-${movieId}`}>
      ID: {movieId}, backdrop: {backdropWidth}
    </div>
  ),
}));

vi.mock("../../../hooks/windowSize", () => ({
  default: vi.fn(),
}));

describe("<Hero />", () => {
  const movies = [0, 1, 2];
  const backdropWidths = [1280, 780, 300];
  const mockUseWindowSize = vi.mocked(useWindowSize);

  const renderHero = (windowWidth: number = 1280) => {
    mockUseWindowSize.mockReturnValueOnce({
      windowWidth,
      windowHeight: 1200,
    });

    render(<Hero movies={movies} />);
  };

  const checkBackdropWidth = (width: number) => {
    for (let i = 0; i < backdropWidths.length; i += 1) {
      if (backdropWidths[i] === width) {
        expect(
          screen.getAllByText(new RegExp(`${width}`)).length,
        ).toBeGreaterThan(0);
      } else {
        expect(
          screen.queryAllByText(new RegExp(`${backdropWidths[i]}`)).length,
        ).toEqual(0);
      }
    }
  };

  it("renders correctly with movies", () => {
    renderHero();

    expect(screen.getByTestId("carousel")).toBeInTheDocument();
    expect(screen.getAllByTestId(/hero-card/i).length).toBe(movies.length);
  });

  it.each(backdropWidths)(
    "uses a proper backdrop width for window width = %i",
    (width: number) => {
      renderHero(width);
      checkBackdropWidth(width);
    },
  );
});
