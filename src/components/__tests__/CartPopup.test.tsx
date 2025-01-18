import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CartPopup from "@/Components/CartPopup";

vi.mock("@/Components/button/ListItemButton", () => ({
  default: ({ movie }: { movie: number }) => (
    <li data-testid={`list-item-${movie}`} />
  ),
}));

describe("<CartPopup />", () => {
  it("renders with empty cart properly", () => {
    render(<CartPopup cart={[]} />);

    const clearBtn = screen.getByRole("button", { name: /clear the cart/i });
    expect(clearBtn).toBeInTheDocument();
    expect(clearBtn).toBeDisabled();

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /looks like you haven’t added anything to your cart yet/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/0 items/i)).toBeInTheDocument();
  });

  it("renders with items in cart properly", () => {
    render(
      <MemoryRouter>
        <CartPopup cart={[0, 1]} />
      </MemoryRouter>,
    );

    expect(screen.getAllByTestId(/list-item/i).length).toEqual(2);
    expect(screen.getByText(/total: \$39.98/i)).toBeInTheDocument();
    expect(screen.getByText(/checkout/i)).toBeInTheDocument();
  });

  it("shows the proper amount of items in header", () => {
    render(
      <MemoryRouter>
        <CartPopup cart={[0, 1]} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/2 items/i)).toBeInTheDocument();
  });

  it("does not allow click when the cart is empty", async () => {
    const fn = vi.fn();
    render(<CartPopup cart={[]} onClear={fn} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /clear the cart/i }));

    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("clears the cart on clear button click", async () => {
    const fn = vi.fn();
    render(
      <MemoryRouter>
        <CartPopup cart={[0]} onClear={fn} />
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /clear the cart/i }));

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("closes on Escape click", async () => {
    const fn = vi.fn();
    render(<CartPopup cart={[]} onClose={fn} />);

    const user = userEvent.setup();
    await act(async () => {
      await user.keyboard("[Escape]");
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("closes on click outside", async () => {
    const fn = vi.fn();
    render(
      <div>
        <CartPopup cart={[]} onClose={fn} />
        <div data-testid="outside">test</div>
      </div>,
    );

    const user = userEvent.setup();

    await act(async () => {
      await user.click(screen.getByTestId("cart-popup"));
    });
    expect(fn).toHaveBeenCalledTimes(0);

    await act(async () => {
      await user.click(screen.getByTestId("outside"));
    });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("closes on checkout button click", async () => {
    const fn = vi.fn();
    render(
      <MemoryRouter>
        <CartPopup cart={[0, 1]} onClose={fn} />
      </MemoryRouter>,
    );

    expect(fn).toHaveBeenCalledTimes(0);
    const user = userEvent.setup();

    await act(async () => {
      await user.click(screen.getByText(/checkout/i));
    });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("navigates to cart page on checkout button click", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/cart" element={<div data-testid="cart-page" />} />
          <Route path="/" element={<CartPopup cart={[0, 1]} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("cart-page")).not.toBeInTheDocument();
    const user = userEvent.setup();

    await act(async () => {
      await user.click(screen.getByText(/checkout/i));
    });

    expect(screen.getByTestId("cart-page")).toBeInTheDocument();
  });
});
