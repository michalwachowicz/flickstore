import { Link } from "react-router-dom";
import InfoIcon from "@/Assets/images/icons/info.svg?react";

interface Props {
  movieId: number;
}

const MovieInfoButton = ({ movieId }: Props) => (
  <Link
    to={`/movie?id=${movieId}`}
    role="button"
    className="btn-info"
    aria-label="Movie info"
  >
    <InfoIcon className="h-11 w-11 [&>path]:fill-neutral-200" />
    <div className="btn-info-bg" />
  </Link>
);

export default MovieInfoButton;
