import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { getMovie } from "../managers/moviesManager";
import { getImageUrl } from "../api/moviesApi";
import AddToCartButton from "@/Components/button/AddToCartButton";
import useParentVisibility from "../hooks/parentVisibilityHook";

interface Props {
  movieId: number;
  image: "backdrop" | "poster";
}

const MovieCard = ({ movieId, image }: Props) => {
  const movie = getMovie(movieId);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const hidden = useParentVisibility(linkRef.current || null);

  if (!movie) return null;

  const img =
    image === "backdrop" && movie.images.backdrops
      ? movie.images.backdrops[0]
      : movie.images.poster;

  const handleAddToCartClick = (event: React.MouseEvent | undefined) => {
    if (!event) return;

    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Link
      ref={linkRef}
      to={`/movie/${movieId}`}
      className="flex h-full flex-col rounded-lg bg-neutral-800 shadow"
      tabIndex={hidden ? -1 : 0}
    >
      <img
        src={getImageUrl(img, image === "backdrop" ? 780 : 342)}
        alt={`${movie.title}`}
        className="rounded-t-lg"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col justify-between gap-4 px-3 py-6">
        <div className="text-lg font-bold text-neutral-50">{movie.title}</div>
        <AddToCartButton
          movieId={movieId}
          onClick={handleAddToCartClick}
          tabIndex={hidden ? -1 : 0}
        />
      </div>
    </Link>
  );
};

export default MovieCard;
