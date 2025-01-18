import { useRef } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@/Assets/images/icons/delete.svg?react";
import CartIcon from "@/Assets/images/icons/cart.svg?react";
import IconButton from "@/Components/button/IconButton";
import ListItemButton from "@/Components/button/ListItemButton";
import useClosePopup from "../hooks/closePopup";
import { getMovie } from "../managers/moviesManager";

interface Props {
  cart: number[];
  onClear?: () => void;
  onClose?: () => void;
}

const CartPopup = ({ cart, onClear = () => {}, onClose = () => {} }: Props) => {
  const isEmpty = cart.length === 0;
  const popupRef = useRef<HTMLDivElement | null>(null);

  useClosePopup(popupRef, onClose);

  return (
    <div
      ref={popupRef}
      data-testid="cart-popup"
      className="absolute right-0 top-full origin-top-right animate-popupOpen rounded-lg bg-neutral-950 p-6 shadow-2xl"
    >
      <header className="flex min-w-72 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-200" tabIndex={-1}>
            Your Cart
          </h2>
          <div className="font-light text-neutral-400">{cart.length} ITEMS</div>
        </div>
        <IconButton label="Clear the cart" disabled={isEmpty} onClick={onClear}>
          <DeleteIcon />
        </IconButton>
      </header>
      {isEmpty && (
        <div className="my-10 flex flex-col items-center">
          <CartIcon className="h-32 w-32 [&>path]:fill-amber-400" />
          <div className="mt-6 text-center">
            <h3 className="mb-2 text-2xl font-black text-neutral-200">
              Your Cart is Empty
            </h3>
            <p className="mx-4 font-light text-neutral-400">
              Looks like you haven’t added anything to your cart yet
            </p>
          </div>
        </div>
      )}
      {!isEmpty && (
        <div className="mt-6">
          <ul className="flex max-h-56 flex-col gap-4 overflow-y-scroll">
            {cart.map((item) => (
              <ListItemButton key={item} movie={getMovie(item)} size="small" />
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <div className="text-xl font-bold text-neutral-50">
              Total: ${19.99 * cart.length}
            </div>
            <Link
              to="/cart"
              type="button"
              className="rounded-lg bg-amber-400 px-6 py-2 text-xl font-bold text-neutral-950 transition-transform ease-in-out hover:scale-105"
              onClick={() => onClose()}
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPopup;
