import { render, screen } from "@testing-library/react";
import Navbar from "@/Components/Navbar";

describe("<Navbar />", () => {
  it("renders all buttons properly", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("button", { name: /go to the homepage/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /open search bar/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /open cart/i }),
    ).toBeInTheDocument();
  });
});
