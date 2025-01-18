import { useParams } from "react-router-dom";

const MockMoviePage = () => {
  const params = useParams();

  return <div data-testid="movie-page">{params.id}</div>;
};

export default MockMoviePage;
