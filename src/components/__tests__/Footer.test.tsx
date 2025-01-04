import { render, screen } from "@testing-library/react";
import Footer from "@/Components/Footer";

describe("<Footer />", () => {
  it("renders correctly", () => {
    render(<Footer />);

    expect(
      screen.getByText(
        /This is a non-commercial project created for educational purposes. Movies cannot be purchased here, and all prices are randomly generated to simulate a real movie store./i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText(/Made with ❤️ by/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Michał Wachowicz/i }),
    ).toBeInTheDocument();
  });
});
