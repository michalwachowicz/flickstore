import React from "react";
import PageButton from "@/Components/button/PageButton";

interface Props {
  moviesOnPage: number;
  totalMovies: number;
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const PageIndicator = ({
  moviesOnPage,
  totalMovies,
  currentPage,
  totalPages,
  onPageChange = () => {},
}: Props) => {
  if (totalPages <= 1 || currentPage > totalPages) return null;

  const getPagesToShow = (): React.ReactNode[] | React.ReactNode => {
    const maxDisplayedPages = 5;

    if (totalPages <= maxDisplayedPages) {
      return (
        <div className="rounded border border-amber-400">
          {Array.from({ length: totalPages }).map((_, i) => {
            const num = i + 1;
            return (
              <PageButton
                key={num}
                page={num}
                isActive={currentPage === num}
                onClick={onPageChange}
              />
            );
          })}
        </div>
      );
    }

    const pages: (string | number)[] = [];

    pages.push(1);
    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(currentPage + 1, totalPages - 1);

    for (let i = start; i <= end; i += 1) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    const groupedPages: React.ReactNode[] = [];
    let numberGroup: number[] = [];

    const addNumberSection = (key: string) => {
      if (numberGroup.length > 0) {
        groupedPages.push(
          <div key={key} className="rounded border border-amber-400">
            {numberGroup.map((num) => (
              <PageButton
                key={num}
                page={num}
                isActive={currentPage === num}
                onClick={onPageChange}
              />
            ))}
          </div>,
        );
        numberGroup = [];
      }
    };

    pages.forEach((page, index) => {
      if (typeof page === "number") {
        numberGroup.push(page);
      } else {
        addNumberSection(`group-${index}`);

        // eslint-disable-next-line react/no-array-index-key
        groupedPages.push(<div key={`separator-${index}`}>{page}</div>);
      }
    });
    addNumberSection("group-final");

    return groupedPages;
  };

  return (
    <div
      data-testid="page-indicator"
      className="flex flex-col items-center gap-4 text-neutral-400"
    >
      {moviesOnPage} out of {totalMovies} movies
      <div className="flex items-end gap-2 font-bold">{getPagesToShow()}</div>
    </div>
  );
};

export default PageIndicator;
