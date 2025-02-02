import { Link } from "react-router-dom";
import InfoIcon from "@/Assets/images/icons/info.svg?react";

interface Props {
  movieId: number;
  tabIndex?: number;
}

const MovieInfoButton = ({ movieId, tabIndex = 0 }: Props) => (
  <Link
    to={`/movie/${movieId}`}
    role="button"
    className="btn-info"
    aria-label="Movie info"
    tabIndex={tabIndex}
  >
    <InfoIcon className="h-11 w-11 [&>path]:fill-neutral-200" />
    <div className="btn-info-bg" />
  </Link>
);

export default MovieInfoButton;
