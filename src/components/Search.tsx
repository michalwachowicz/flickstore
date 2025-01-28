import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../interfaces/Movie";
import SearchIcon from "@/Assets/images/icons/search.svg?react";
import ListItemButton from "@/Components/button/ListItemButton";
import useDebounce from "../hooks/debounce";
import useClosePopup from "../hooks/closePopup";
import getSearchResults from "../managers/searchManager";

interface Props {
  onClose?: () => void;
}

const Search = ({ onClose = () => {} }: Props) => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [focused, setFocused] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useClosePopup(searchBoxRef, onClose);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    const updateMovies = async () => {
      const results = await getSearchResults(debouncedQuery);
      setMovies(results.slice(0, 3));
    };

    updateMovies();
  }, [debouncedQuery]);

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
        className="max-h-[calc(100vh-2rem)] w-full max-w-xl origin-top animate-popupOpen rounded-lg bg-neutral-900 p-4 shadow-lg"
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
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </label>
        </form>
        {movies.length > 0 && (
          <div className="mt-6">
            <ul className="flex flex-col gap-6">
              {movies.map((movie) => (
                <ListItemButton movie={movie} key={movie.id} />
              ))}
            </ul>
            <Link
              className="mt-6 flex w-full items-center justify-center rounded-lg bg-amber-400 p-4 text-2xl font-bold text-neutral-950"
              to={`/search/${debouncedQuery.replace(" ", "%20")}/1`}
              role="button"
              onClick={() => onClose()}
            >
              See More Results
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
