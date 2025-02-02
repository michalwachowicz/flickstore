import { render, screen } from "@testing-library/react";
import ProfilePicture from "@/Components/ProfilePicture";

describe("<ProfilePicture />", () => {
  it("renders properly with an image", () => {
    render(<ProfilePicture image="test.jpg" alt="Test" />);

    expect(screen.getByAltText("Test")).toBeInTheDocument();
    expect(screen.queryByTestId("person-icon")).not.toBeInTheDocument();
  });

  it("renders properly without an image", () => {
    render(<ProfilePicture />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByTestId("person-icon")).toBeInTheDocument();
  });

  it("renders with proper sizes", () => {
    render(<ProfilePicture imageSize={8} iconSize={6} />);

    const container = screen.getByTestId("profile-picture");
    const icon = screen.getByTestId("person-icon");

    expect(container).toHaveStyle("width: 8rem; height: 8rem");
    expect(icon).toHaveStyle("width: 6rem; height: 6rem");
  });
});
