import { useParams } from "react-router-dom";

const MockSearchPage = () => {
  const { query, page } = useParams();

  return (
    <div data-testid="search-page">
      {query} {page}
    </div>
  );
};

export default MockSearchPage;
