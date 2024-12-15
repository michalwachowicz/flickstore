import Logo from "@/Assets/images/logo/logo.svg?react";
import SearchIcon from "@/Assets/images/icons/search.svg?react";
import CartIcon from "@/Assets/images/icons/cart.svg?react";
import IconButton from "@/Components/IconButton";

const Navbar = () => (
  <nav className="fixed inset-x-0 top-0 w-full bg-neutral-950 p-6 shadow-xl">
    <div className="mx-auto flex max-w-5xl items-center justify-between">
      <button
        className="max-w-36"
        type="button"
        aria-label="Go to the homepage"
      >
        <Logo className="h-auto w-full" />
      </button>

      <div className="flex gap-4">
        <IconButton label="Open search bar">
          <SearchIcon />
        </IconButton>
        <IconButton label="Open cart">
          <CartIcon />
        </IconButton>
      </div>
    </div>
  </nav>
);

export default Navbar;
