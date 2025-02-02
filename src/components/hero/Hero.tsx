import useWindowSize from "../../hooks/windowSize";
import Carousel from "@/Components/carousel/Carousel";
import HeroCard from "@/Components/hero/HeroCard";
import getBackdropWidth from "../../utils/backdropUtils";

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
