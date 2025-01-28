/* eslint-disable react/require-default-props */
import React, { ForwardedRef } from "react";
import { Link } from "react-router-dom";
import Carousel from "@/Components/carousel/Carousel";
import MovieCard from "@/Components/MovieCard";
import ChevronIcon from "@/Assets/images/icons/chevron.svg?react";
import VisibleCountObject from "../interfaces/VisibleCountObject";

interface Props {
  title: string;
  movies: number[];
  genreId?: number;
  imageType?: "poster" | "backdrop";
  visibleCount?: number | VisibleCountObject;
}

const MoviesSection = React.forwardRef(
  (props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      title,
      movies,
      genreId = -1,
      imageType = "poster",
      visibleCount = { sm: 2, md: 4, lg: 6 },
    } = props;

    if (movies.length === 0) return null;

    return (
      <section ref={ref}>
        <div className="mx-6 mb-6 flex items-center gap-4">
          <h2 className="text-2xl font-bold text-amber-400">{title}</h2>
          {genreId !== -1 && (
            <Link
              to={`/genre/${genreId}/1`}
              className="flex items-center gap-1 text-neutral-500"
            >
              See more{" "}
              <ChevronIcon className="h-4 w-4 [&>path]:fill-neutral-500" />
            </Link>
          )}
        </div>
        <Carousel visibleCount={visibleCount} marginX={1.5}>
          {movies.map((movieId) => (
            <MovieCard key={movieId} movieId={movieId} image={imageType} />
          ))}
        </Carousel>
      </section>
    );
  },
);

export default MoviesSection;
