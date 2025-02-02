import { render, screen } from "@testing-library/react";
import LoadingScreen from "@/Components/LoadingScreen";

describe("<LoadingScreen />", () => {
  it("renders correctly", () => {
    render(<LoadingScreen />);

    expect(screen.getByTestId("movie-icon")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Loading..." }),
    ).toBeInTheDocument();
  });
});
