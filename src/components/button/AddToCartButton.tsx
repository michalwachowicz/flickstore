import { useCart, useCartDispatch } from "../../contexts/CartContext";
import CheckIcon from "@/Assets/images/icons/check.svg?react";

interface Props {
  movieId: number;
}

const AddToCartButton = ({ movieId }: Props) => {
  const cart = useCart();
  const cartDispatch = useCartDispatch();
  const isInCart = cart.includes(movieId);

  const handleClick = () => {
    cartDispatch({ type: isInCart ? "deleted" : "added", id: movieId });
  };

  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-lg bg-amber-400 px-3 py-2 transition-transform ease-in-out hover:scale-105"
      onClick={handleClick}
    >
      {isInCart && (
        <CheckIcon
          aria-label="Added to Cart"
          className="h-9 w-9 [&>path]:fill-neutral-950"
        />
      )}
      <div className="text-left text-neutral-950">
        <div className="text-sm font-light">
          {isInCart ? "Added to" : "Add to Cart"}
        </div>
        <div className="text-lg font-bold">
          {isInCart && "Cart"}
          {!isInCart && (
            <>
              UHD <span className="font-medium">$19.99</span>
            </>
          )}
        </div>
      </div>
    </button>
  );
};

export default AddToCartButton;
