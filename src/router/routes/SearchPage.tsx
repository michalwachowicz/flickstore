import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useSearchView,
  useSearchViewDispatch,
} from "../../contexts/SearchViewContext";
import ViewIconButton from "@/Components/button/ViewIconButton";
import PageIndicator from "@/Components/PageIndicator";
import ListItemButton from "@/Components/button/ListItemButton";
import MovieCard from "@/Components/MovieCard";
import getSearchResults, {
  getSearchTotals,
} from "../../managers/searchManager";
import {
  GenreId,
  getGenre,
  getGenreResults,
  getGenreTotals,
} from "../../managers/genresManager";
import { Movie } from "../../interfaces/Movie";

const SearchPage = ({ type }: { type: "search" | "genre" }) => {
  const { query, page } = useParams();

  const searchView = useSearchView();
  const searchViewDispatch = useSearchViewDispatch();

  const [totalPages, setTotalPages] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const updateMovies = async () => {
      const currentPage = parseInt(page || "1", 10);
      let moviesArr: Movie[];
      let totals: { totalPages: number; totalResults: number };

      if (type === "search" && query) {
        moviesArr = await getSearchResults(query, currentPage);
        totals = getSearchTotals(query);
      } else {
        const genreId = parseInt(query || "0", 10) as GenreId;

        moviesArr = await getGenreResults(genreId, currentPage);
        totals = getGenreTotals(genreId);
      }

      setMovies(moviesArr);
      setTotalPages(totals.totalPages);
      setTotalMovies(totals.totalResults);
    };

    updateMovies();
  }, [page, query, type]);

  const handlePageChange = () => {
    window.scrollTo(0, 0);
  };

  if (!query) return null;

  return (
    <div className="wrapper">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-200">
          {type === "search"
            ? `Search "${query}"`
            : `${getGenre(parseInt(query || "0", 10) as GenreId)} movies`}
        </h1>
        <ViewIconButton
          isList={searchView === "list"}
          onClick={() => searchViewDispatch({ type: "switch" })}
        />
      </header>
      <div className="mb-10">
        {searchView === "list" && (
          <ul className="flex flex-col gap-6">
            {movies.map((movie) => (
              <ListItemButton key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
        {searchView === "grid" && (
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {movies.map((movie) => (
              <li key={movie.id}>
                <MovieCard movieId={movie.id} image="poster" />
              </li>
            ))}
          </ul>
        )}
      </div>
      <PageIndicator
        moviesOnPage={movies.length}
        totalMovies={totalMovies}
        currentPage={parseInt(page || "1", 10)}
        totalPages={totalPages}
        type={type}
        query={query}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchPage;
