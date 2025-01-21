import { useRef, useState } from "react";
import { Link } from "react-router-dom";
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
        <Link to="/" className="max-w-36" aria-label="Homepage">
          <Logo className="h-auto w-full" />
        </Link>

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
            {cart.length > 0 && (
              <div
                data-testid="cart-icon-count"
                className="absolute bottom-0 right-0 rounded-2xl bg-amber-400 px-1.5 py-0.5 text-xs font-bold text-neutral-950"
              >
                {cart.length}
              </div>
            )}
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
