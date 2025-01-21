import { act } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useCart } from "../../contexts/CartContext";
import Navbar from "@/Components/Navbar";

vi.mock("@/Components/CartPopup", () => ({
  default: () => <div data-testid="cart-popup" />,
}));

vi.mock("../../contexts/CartContext", async () => {
  const actual = (await vi.importActual(
    "../../contexts/CartContext",
  )) as typeof import("../../contexts/CartContext");

  return {
    ...actual,
    useCart: vi.fn(),
  };
});

describe("<Navbar />", () => {
  const mockUseCart = vi.mocked(useCart);

  beforeEach(() => {
    mockUseCart.mockReturnValue([]);
  });

  it("renders all buttons properly", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /homepage/i })).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /open search bar/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /open cart/i }),
    ).toBeInTheDocument();
  });

  it("applies correct aria-expanded value on search button", () => {
    const { rerender } = render(
      <MemoryRouter>
        <Navbar isSearchOpen={false} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: /open search bar/i }),
    ).toHaveAttribute("aria-expanded", "false");

    rerender(
      <MemoryRouter>
        <Navbar isSearchOpen />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("button", { name: /open search bar/i }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("opens the search box on search button click", async () => {
    const fn = vi.fn();
    render(
      <MemoryRouter>
        <Navbar onSearchOpen={fn} />
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    await act(async () => {
      await user.click(
        screen.getByRole("button", { name: /open search bar/i }),
      );
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).not.toHaveBeenCalledWith(null);
  });

  it("opens the cart popup on button click", async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("cart-popup")).not.toBeInTheDocument();

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("button", { name: /open cart/i }));
    });

    expect(screen.getByTestId("cart-popup")).toBeInTheDocument();
  });

  it("changes cart button title", async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    const openBtn = screen.getByRole("button", { name: /open cart/i });

    expect(openBtn).toBeInTheDocument();
    await act(async () => {
      await user.click(openBtn);
    });

    expect(
      screen.getByRole("button", { name: /close cart/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /open cart/i }),
    ).not.toBeInTheDocument();
  });

  it("shows the cart navbar icon items count", () => {
    const { rerender } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("cart-icon-count")).not.toBeInTheDocument();
    mockUseCart.mockReturnValueOnce([0, 1, 3]);

    rerender(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const cartCount = screen.getByTestId("cart-icon-count");
    expect(cartCount).toBeInTheDocument();
    expect(cartCount.textContent).toEqual("3");
  });

  it("navigates to homepage on logo click", async () => {
    render(
      <MemoryRouter initialEntries={["/nav"]}>
        <Routes>
          <Route path="/nav" element={<Navbar />} />
          <Route path="/" element={<div data-testid="homepage" />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("homepage")).not.toBeInTheDocument();

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("link", { name: /homepage/i }));
    });

    expect(screen.getByTestId("homepage")).toBeInTheDocument();
  });
});
