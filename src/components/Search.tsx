import { useEffect, useRef, useState } from "react";
import SearchIcon from "@/Assets/images/icons/search.svg?react";

interface Props {
  onClose?: () => void;
}

const Search = ({ onClose = () => {} }: Props) => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        searchBoxRef.current === null ||
        target === null ||
        !searchBoxRef.current.contains(target)
      ) {
        onClose();
      }
    };

    setTimeout(() => {
      window.addEventListener("click", clickHandler);
    }, 0);

    return () => {
      setTimeout(() => {
        window.removeEventListener("click", clickHandler);
      }, 0);
    };
  }, [onClose]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-x-0 top-0 flex h-screen w-screen items-center justify-center p-6">
      <div
        data-testid="backdrop"
        className="fixed inset-x-0 top-0 -z-10 h-full w-full bg-neutral-950 opacity-80"
      />
      <div
        id="search-box"
        data-testid="search-box"
        ref={searchBoxRef}
        className="w-full max-w-xl rounded-lg bg-neutral-900 p-4 shadow-lg"
      >
        <form
          className={`rounded-lg bg-neutral-800 p-2 ${focused ? "border-2 border-solid border-amber-400" : ""}`}
        >
          <label
            aria-label="Search"
            htmlFor="search"
            className="flex w-full items-center gap-2"
          >
            <SearchIcon className="h-9 w-9 [&>path]:fill-neutral-400" />
            <input
              type="text"
              ref={inputRef}
              id="search"
              placeholder="Search"
              className="w-full bg-transparent text-xl font-bold text-neutral-200 placeholder-neutral-400 outline-none"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </label>
        </form>
        {/* TODO: Add List */}
      </div>
    </div>
  );
};

export default Search;
