import { render, screen } from "@testing-library/react";
import HeroCard from "@/Components/hero/HeroCard";

vi.mock("../../../managers/moviesManager", () => ({
  getMovie: () => ({
    id: 0,
    title: "Test",
    releaseDate: "2025-01-01",
    images: {
      poster: "test.jpg",
      backdrops: ["backdrop.jpg"],
    },
  }),
}));

vi.mock("@/Components/button/AddToCartButton", () => ({
  default: () => (
    <button
      type="button"
      data-testid="btn-add-to-cart"
      aria-label="Add to Cart"
    />
  ),
}));

vi.mock("@/Components/button/MovieInfoButton", () => ({
  default: () => (
    <button
      type="button"
      data-testid="btn-movie-info"
      aria-label="Movie Info"
    />
  ),
}));

describe("<HeroCard />", () => {
  it("renders correctly", () => {
    render(<HeroCard movieId={0} backdropWidth={780} />);

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByTestId("btn-add-to-cart")).toBeInTheDocument();
    expect(screen.getByTestId("btn-movie-info")).toBeInTheDocument();
    expect(screen.getByAltText(/test's backdrop/i)).toBeInTheDocument();
  });
});
