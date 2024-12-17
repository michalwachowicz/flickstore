export default interface SearchQuery {
  totalPages: number;
  totalResults: number;
  pages: {
    [key: number]: number[];
  };
}
