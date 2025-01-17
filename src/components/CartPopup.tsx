import { useRef } from "react";
import DeleteIcon from "@/Assets/images/icons/delete.svg?react";
import CartIcon from "@/Assets/images/icons/cart.svg?react";
import IconButton from "@/Components/button/IconButton";
import useClosePopup from "../hooks/closePopup";

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
    </div>
  );
};

export default CartPopup;
