import { useEffect, useRef, useState } from "react";
import {
  getCachedPopularMovies,
  getCachedTopRatedMovies,
} from "../../managers/moviesManager";
import Hero from "@/Components/hero/Hero";
import MoviesSection from "@/Components/MoviesSection";
import {
  getGenre,
  getGenreList,
  getGenreResults,
} from "../../managers/genresManager";

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState<number[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<number[]>([]);
  const [sections, setSections] = useState<
    { id: number; title: string; movies: number[] }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const lastSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      const cachedPopular = await getCachedPopularMovies();
      setPopularMovies(cachedPopular);

      const cachedTopRatedMovies = await getCachedTopRatedMovies();
      setTopRatedMovies(cachedTopRatedMovies);

      const firstGenreId = getGenreList()[0];
      const firstGenre = await getGenreResults(firstGenreId);

      setSections([
        {
          id: firstGenreId,
          title: getGenre(firstGenreId),
          movies: firstGenre.map((movie) => movie.id),
        },
      ]);
    })();
  }, []);

  useEffect(() => {
    const loadedCount = sections.length;
    const totalCount = getGenreList().length;

    if (loadedCount === totalCount || !lastSectionRef.current) return () => {};
    const lastSection = lastSectionRef.current;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setLoading(true);

          const nextGenreId = getGenreList()[loadedCount];
          const results = await getGenreResults(nextGenreId);

          setSections((prev) => [
            ...prev,
            {
              id: nextGenreId,
              title: getGenre(nextGenreId),
              movies: results.map((movie) => movie.id),
            },
          ]);
          setLoading(false);
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(lastSection);

    return () => {
      observer.unobserve(lastSection);
    };
  }, [sections, loading]);

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
        {sections.map(({ id, title, movies }, index) => (
          <MoviesSection
            ref={index === sections.length - 1 ? lastSectionRef : null}
            key={id}
            genreId={id}
            title={title}
            movies={movies}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
