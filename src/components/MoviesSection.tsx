import React from "react";
import { Link } from "react-router-dom";
import Carousel from "@/Components/carousel/Carousel";
import ChevronIcon from "@/Assets/images/icons/chevron.svg?react";
import VisibleCountObject from "../interfaces/VisibleCountObject";

interface Props {
  title: string;
  genreId?: number;
  visibleCount?: number | VisibleCountObject;
  children: React.ReactNode | React.ReactNode[];
}

const MoviesSection = ({
  title,
  genreId = -1,
  visibleCount = { sm: 2, md: 4, lg: 6 },
  children,
}: Props) => (
  <section>
    <div className="mx-6 mb-6 flex items-center gap-4">
      <h2 className="text-2xl font-bold text-amber-400">{title}</h2>
      {genreId !== -1 && (
        <Link
          to={`/genre/${genreId}`}
          className="flex items-center gap-1 text-neutral-500"
        >
          See more <ChevronIcon className="h-4 w-4 [&>path]:fill-neutral-500" />
        </Link>
      )}
    </div>
    <Carousel visibleCount={visibleCount} marginX={1.5}>
      {children}
    </Carousel>
  </section>
);

export default MoviesSection;
