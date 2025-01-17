import { useRef, useState } from "react";
import Logo from "@/Assets/images/logo/logo.svg?react";
import SearchIcon from "@/Assets/images/icons/search.svg?react";
import CartIcon from "@/Assets/images/icons/cart.svg?react";
import IconButton from "@/Components/button/IconButton";
import CartPopup from "@/Components/CartPopup";
import { useCart, useCartDispatch } from "../contexts/CartContext";

interface Props {
  isSearchOpen?: boolean;
  onSearchOpen?: (ref: HTMLButtonElement | null) => void;
}

const Navbar = ({ isSearchOpen = false, onSearchOpen = () => {} }: Props) => {
  const cart = useCart();
  const cartDispatch = useCartDispatch();
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const [cartPopupOpen, setCartPopupOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-10 w-full bg-neutral-950 p-6 shadow-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <button
          className="max-w-36"
          type="button"
          aria-label="Go to the homepage"
        >
          <Logo className="h-auto w-full" />
        </button>

        <div className="relative flex gap-4">
          <IconButton
            ref={searchBtnRef}
            label="Open search bar"
            ariaControls="search-box"
            ariaExpanded={isSearchOpen}
            onClick={() => onSearchOpen(searchBtnRef.current)}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            label={`${cartPopupOpen ? "Close" : "Open"} cart`}
            onClick={() => setCartPopupOpen(true)}
          >
            <CartIcon />
          </IconButton>

          {cartPopupOpen && (
            <CartPopup
              cart={cart}
              onClear={() => cartDispatch({ type: "cleared" })}
              onClose={() => setCartPopupOpen(false)}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
