import { Link } from "react-router-dom";
import { useCart, useCartDispatch } from "../../contexts/CartContext";
import IconButton from "@/Components/button/IconButton";
import CartIcon from "@/Assets/images/icons/cart.svg?react";
import DeleteIcon from "@/Assets/images/icons/delete.svg?react";
import ListItemButton from "@/Components/button/ListItemButton";
import { getMovie } from "../../managers/moviesManager";

const CartPage = () => {
  const cart = useCart();
  const cartDispatch = useCartDispatch();

  const cartLength = cart.length;
  const isEmpty = cartLength === 0;

  const total = cartLength * 19.99;
  const totalStr = total.toFixed(2);
  const vat = (total * 0.23).toFixed(2);
  const subtotal = (total - parseFloat(vat)).toFixed(2);

  return (
    <main className="wrapper">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-200">Your Cart</h1>
        <IconButton
          label="Clear the cart"
          disabled={isEmpty}
          onClick={() =>
            cartDispatch({
              type: "cleared",
            })
          }
        >
          <DeleteIcon />
        </IconButton>
      </header>
      {isEmpty && (
        <div className="mt-10 flex flex-col items-center">
          <CartIcon className="h-32 w-32 [&>path]:fill-amber-400" />
          <div className="mt-6 text-center">
            <h2 className="mb-2 text-2xl font-black text-neutral-200">
              Your Cart is Empty
            </h2>
            <p className="mx-4 font-light text-neutral-400">
              Looks like you haven’t added anything to your cart yet
            </p>
          </div>
          <Link
            to="/"
            className="mt-6 flex w-full max-w-xs justify-center rounded-lg bg-amber-400 p-4 text-2xl font-bold text-neutral-950"
          >
            Explore Movies
          </Link>
        </div>
      )}
      {!isEmpty && (
        <div className="mt-10 flex flex-col gap-10 md:flex-row md:gap-12 lg:gap-28">
          <ul className="flex-1">
            {cart.map((movieId) => (
              <ListItemButton key={movieId} movie={getMovie(movieId)} />
            ))}
          </ul>
          <div className="flex flex-1 flex-col gap-6 rounded border border-neutral-600 p-4">
            <h2 className="text-xl font-bold text-neutral-200">
              Order Summary
            </h2>
            <div className="text-neutral-400">
              <div className="flex items-center justify-between">
                <div>Subtotal ({cartLength} items)</div>
                <div>${subtotal}</div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>VAT (23%)</div>
                <div>${vat}</div>
              </div>
            </div>
            <hr className="border-neutral-600" />
            <div className="flex items-center justify-between text-lg font-bold text-neutral-200">
              <div>Total</div>
              <div>${totalStr}</div>
            </div>
            <button
              type="button"
              className="rounded-lg bg-amber-400 p-4 text-2xl font-bold text-neutral-950"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;
