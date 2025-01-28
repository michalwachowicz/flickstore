import { act } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import PageButton from "@/Components/button/PageButton";
import MockSearchPage from "@/Components/mocks/MockSearchPage";

describe("<PageButton />", () => {
  it("renders with a page number", () => {
    render(
      <MemoryRouter>
        <PageButton page={1} query="" type="search" />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "1" })).toBeInTheDocument();
  });

  it("handles click with the page number", async () => {
    const fn = vi.fn();
    render(
      <MemoryRouter>
        <PageButton page={3} onClick={fn} query="" type="search" />
      </MemoryRouter>,
    );

    expect(fn).toHaveBeenCalledTimes(0);

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("link"));
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
  });

  describe("routing", () => {
    const testRoute = async (
      type: "genre" | "search",
      query: string,
      page: number,
    ) => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={<PageButton page={page} query={query} type={type} />}
            />
            <Route
              path={`/${type}/:query/:page`}
              element={<MockSearchPage />}
            />
          </Routes>
        </MemoryRouter>,
      );
      expect(screen.queryByTestId("search-page")).not.toBeInTheDocument();

      const user = userEvent.setup();
      await act(async () => {
        await user.click(screen.getByRole("link"));
      });

      expect(screen.getByTestId("search-page")).toBeInTheDocument();
      expect(screen.getByText(`${query} ${page}`)).toBeInTheDocument();
    };

    it("routes to a search page properly", async () => {
      await testRoute("search", "test", 2);
    });

    it("routes to a genre page properly", async () => {
      await testRoute("genre", "test", 1);
    });
  });
});
