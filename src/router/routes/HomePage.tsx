import { useEffect, useState } from "react";
import { getCachedPopularMovies } from "../../managers/moviesManager";
import Hero from "@/Components/hero/Hero";

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const cachedPopular = await getCachedPopularMovies();
      setPopularMovies(cachedPopular);
    })();
  }, []);

  return (
    <div>
      <Hero movies={popularMovies} />
    </div>
  );
};

export default HomePage;
