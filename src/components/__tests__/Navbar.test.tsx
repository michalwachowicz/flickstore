import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
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

  it("applies correct aria-expanded value on search button", () => {
    const { rerender } = render(<Navbar isSearchOpen={false} />);
    expect(
      screen.getByRole("button", { name: /open search bar/i }),
    ).toHaveAttribute("aria-expanded", "false");

    rerender(<Navbar isSearchOpen />);
    expect(
      screen.getByRole("button", { name: /open search bar/i }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("opens the search box on search button click", async () => {
    const fn = vi.fn();
    render(<Navbar onSearchOpen={fn} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /open search bar/i }));

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).not.toHaveBeenCalledWith(null);
  });
});
