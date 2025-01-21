import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import {
  CartProvider,
  useCart,
  useCartDispatch,
} from "../../../contexts/CartContext";
import CartPage from "../CartPage";

vi.mock("@/Components/button/ListItemButton", () => ({
  default: ({ movie }: { movie: number }) => (
    <li data-testid={`list-item-${movie}`} />
  ),
}));

vi.mock("../../../contexts/CartContext", async () => {
  const actual = (await vi.importActual(
    "../../../contexts/CartContext",
  )) as typeof import("../../../contexts/CartContext");

  return {
    ...actual,
    useCart: vi.fn(),
    useCartDispatch: vi.fn(),
  };
});

const CartPageWithProvider = () => (
  <CartProvider>
    <CartPage />
  </CartProvider>
);

describe("<CartPage />", () => {
  const mockUseCart = vi.mocked(useCart);

  beforeEach(() => {
    mockUseCart.mockReturnValue([]);
  });

  it("renders the header with proper icon", () => {
    const { rerender } = render(
      <MemoryRouter>
        <CartPageWithProvider />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Your Cart" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear/i })).toBeDisabled();

    mockUseCart.mockReturnValueOnce([0]);
    rerender(
      <MemoryRouter>
        <CartPageWithProvider />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Your Cart" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear/i })).not.toBeDisabled();
  });

  it("clears the cart on clear button click", async () => {
    const mockUseCartDispatch = vi.mocked(useCartDispatch);
    const mockDispatch = vi.fn();

    mockUseCartDispatch.mockReturnValue(mockDispatch);
    mockUseCart.mockReturnValueOnce([0]);

    render(
      <MemoryRouter>
        <CartPageWithProvider />
      </MemoryRouter>,
    );

    expect(mockDispatch).toHaveBeenCalledTimes(0);

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("button", { name: /clear/i }));
    });

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "cleared",
    });
  });

  it("renders proper non empty cart state", () => {
    mockUseCart.mockReturnValueOnce([0, 1]);

    render(
      <MemoryRouter>
        <CartPageWithProvider />
      </MemoryRouter>,
    );

    expect(screen.getAllByTestId(/list-item/i).length).toBe(2);

    expect(
      screen.getByRole("heading", { name: /order summary/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/subtotal \(2 items\)/i)).toBeInTheDocument();
    expect(screen.getByText(/\$30.78/i)).toBeInTheDocument();

    expect(screen.getByText(/vat \(23%\)/i)).toBeInTheDocument();
    expect(screen.getByText(/\$9.20/i)).toBeInTheDocument();

    expect(screen.getByText(/^total/i)).toBeInTheDocument();
    expect(screen.getByText(/\$39.98/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /checkout/i }),
    ).toBeInTheDocument();
  });

  it("renders proper empty cart state", () => {
    render(
      <MemoryRouter>
        <CartPageWithProvider />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /your cart is empty/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /looks like you haven’t added anything to your cart yet/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /explore movies/i }),
    ).toBeInTheDocument();
  });

  it("navigates to home page on explore movies button click", async () => {
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Routes>
          <Route path="/cart" element={<CartPageWithProvider />} />
          <Route path="/" element={<div data-testid="homepage" />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("homepage")).not.toBeInTheDocument();

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("link", { name: /explore movies/i }));
    });

    expect(screen.getByTestId("homepage")).toBeInTheDocument();
  });
});
