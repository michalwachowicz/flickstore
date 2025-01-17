import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { CartProvider } from "../../contexts/CartContext";
import AddToCartButton from "@/Components/AddToCartButton";

describe("<AddToCartButton />", () => {
  it("adds and removes movie properly", async () => {
    render(
      <CartProvider>
        <AddToCartButton movieId={0} />
      </CartProvider>,
    );

    const checkIfNotAdded = () => {
      expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
      expect(screen.getByText(/UHD/i)).toBeInTheDocument();
      expect(screen.getByText(/\$19.99/)).toBeInTheDocument();
    };
    checkIfNotAdded();

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    expect(screen.getByText(/added to/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/added to cart/i)).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByRole("button"));
    });
    checkIfNotAdded();
  });
});
