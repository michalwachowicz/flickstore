import { useEffect } from "react";
import MovieIcon from "@/Assets/images/icons/movie.svg?react";

const LoadingScreen = () => {
  useEffect(() => {
    document.title = "Loading... | FlickStore";
  }, []);

  return (
    <div className="wrapper flex flex-col items-center justify-center gap-6 pt-28">
      <MovieIcon
        data-testid="movie-icon"
        className="h-24 w-24 animate-bounce [&>path]:fill-amber-400"
      />
      <h1 className="text-4xl font-bold text-neutral-200">Loading...</h1>
    </div>
  );
};

export default LoadingScreen;
