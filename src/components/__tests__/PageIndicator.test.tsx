import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import PageIndicator from "@/Components/PageIndicator";

vi.mock("@/Components/button/PageButton", () => ({
  default: ({
    page,
    onClick = () => {},
  }: {
    page: number;
    onClick?: (num: number) => void;
  }) => (
    <button type="button" onClick={() => onClick(page)}>
      {page}
    </button>
  ),
}));

describe("<PageIndicator />", () => {
  it("shows the number of movies on page and total movies", () => {
    render(
      <PageIndicator
        moviesOnPage={12}
        totalMovies={78}
        currentPage={1}
        totalPages={2}
        type="search"
        query="test"
      />,
    );

    expect(screen.getByText(/12 out of 78 movies/i)).toBeInTheDocument();
  });

  it("renders nothing if total number of pages is 1 or less", () => {
    render(
      <PageIndicator
        moviesOnPage={12}
        totalMovies={78}
        currentPage={1}
        totalPages={1}
        type="search"
        query="test"
      />,
    );

    expect(screen.queryByTestId("page-indicator")).not.toBeInTheDocument();
  });

  it("renders nothing if current page is bigger than total pages", () => {
    render(
      <PageIndicator
        moviesOnPage={12}
        totalMovies={78}
        currentPage={3}
        totalPages={2}
        type="search"
        query="test"
      />,
    );

    expect(screen.queryByTestId("page-indicator")).not.toBeInTheDocument();
  });

  it("shows all page numbers if number of pages <= 5", () => {
    render(
      <PageIndicator
        moviesOnPage={12}
        totalMovies={78}
        currentPage={1}
        totalPages={5}
        type="search"
        query="test"
      />,
    );

    for (let i = 1; i <= 5; i += 1) {
      expect(screen.getByRole("button", { name: `${i}` })).toBeInTheDocument();
    }

    expect(screen.queryByText("...")).not.toBeInTheDocument();
  });

  it("shows proper page numbers at the beginning", () => {
    render(
      <PageIndicator
        moviesOnPage={12}
        totalMovies={78}
        currentPage={2}
        totalPages={12}
        type="search"
        query="test"
      />,
    );

    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: `${12}` })).toBeInTheDocument();

    for (let i = 1; i <= 3; i += 1) {
      expect(screen.getByRole("button", { name: `${i}` })).toBeInTheDocument();
    }

    for (let i = 4; i <= 11; i += 1) {
      expect(
        screen.queryByRole("button", { name: `${i}` }),
      ).not.toBeInTheDocument();
    }
  });

  it("shows proper page numbers in the middle", () => {
    render(
      <PageIndicator
        moviesOnPage={12}
        totalMovies={78}
        currentPage={5}
        totalPages={12}
        type="search"
        query="test"
      />,
    );

    expect(screen.getAllByText("...")).toHaveLength(2);
    expect(screen.getByRole("button", { name: `${1}` })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: `${12}` })).toBeInTheDocument();

    for (let i = 2; i <= 11; i += 1) {
      if (i >= 4 && i <= 6) {
        expect(
          screen.getByRole("button", { name: `${i}` }),
        ).toBeInTheDocument();
      } else {
        expect(
          screen.queryByRole("button", { name: `${i}` }),
        ).not.toBeInTheDocument();
      }
    }
  });

  it("shows proper page numbers at the end", () => {
    render(
      <PageIndicator
        moviesOnPage={12}
        totalMovies={78}
        currentPage={10}
        totalPages={12}
        type="search"
        query="test"
      />,
    );

    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: `${1}` })).toBeInTheDocument();

    for (let i = 9; i <= 12; i += 1) {
      expect(screen.getByRole("button", { name: `${i}` })).toBeInTheDocument();
    }

    for (let i = 2; i <= 8; i += 1) {
      expect(
        screen.queryByRole("button", { name: `${i}` }),
      ).not.toBeInTheDocument();
    }
  });

  it("handles page change properly", async () => {
    const fn = vi.fn();
    render(
      <PageIndicator
        moviesOnPage={12}
        totalMovies={78}
        currentPage={10}
        totalPages={12}
        type="search"
        query="test"
        onPageChange={fn}
      />,
    );

    expect(fn).toHaveBeenCalledTimes(0);

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "12" }));
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(12);
  });
});
