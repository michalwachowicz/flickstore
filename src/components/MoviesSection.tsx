/* eslint-disable react/require-default-props */
import React, { ForwardedRef } from "react";
import Carousel from "@/Components/carousel/Carousel";
import MovieCard from "@/Components/MovieCard";
import SectionHeader from "@/Components/SectionHeader";
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
    const route = genreId !== -1 ? `/genre/${genreId}/1` : undefined;

    return (
      <section ref={ref}>
        <SectionHeader title={title} route={route} marginX={6} />
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
