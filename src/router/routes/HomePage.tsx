import { useEffect, useState } from "react";
import {
  getCachedPopularMovies,
  getCachedTopRatedMovies,
} from "../../managers/moviesManager";
import Hero from "@/Components/hero/Hero";
import MoviesSection from "@/Components/MoviesSection";

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState<number[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const cachedPopular = await getCachedPopularMovies();
      setPopularMovies(cachedPopular);

      const cachedTopRatedMovies = await getCachedTopRatedMovies();
      setTopRatedMovies(cachedTopRatedMovies);
    })();
  }, []);

  return (
    <div>
      <Hero movies={popularMovies} />
      <div className="mx-auto my-10 flex max-w-5xl flex-col gap-10">
        <MoviesSection
          title="Top Rated"
          visibleCount={{ sm: 1, md: 2, lg: 3 }}
          movies={topRatedMovies}
          imageType="backdrop"
        />
      </div>
    </div>
  );
};

export default HomePage;
