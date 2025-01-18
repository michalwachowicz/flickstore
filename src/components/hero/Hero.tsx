import useWindowSize from "../../hooks/windowSize";
import Carousel from "@/Components/carousel/Carousel";
import HeroCard from "@/Components/hero/HeroCard";

const getBackdropWidth = (windowWidth: number) => {
  if (windowWidth <= 300) return 300;
  if (windowWidth <= 780) return 780;

  return 1280;
};

interface Props {
  movies: number[];
}

const Hero = ({ movies }: Props) => {
  const { windowWidth } = useWindowSize();
  const backdropWidth = getBackdropWidth(windowWidth);

  return (
    <div className="bg-neutral-950 text-neutral-50">
      <div className="mx-auto max-w-5xl">
        <Carousel visibleCount={1} autoSlide={5000}>
          {movies.map((movieId) => (
            <HeroCard
              key={movieId}
              movieId={movieId}
              backdropWidth={backdropWidth}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
