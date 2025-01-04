import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Search from "@/Components/Search";

vi.mock("../../managers/searchManager", () => ({
  default: () =>
    Promise.resolve([
      {
        id: 0,
        title: "Test 1",
        releaseDate: "2025-01-01",
        images: { poster: "/test" },
      },
      {
        id: 1,
        title: "Test 2",
        releaseDate: "2025-01-01",
        images: { poster: "/test" },
      },
      {
        id: 2,
        title: "Test 3",
        releaseDate: "2025-01-01",
        images: { poster: "/test" },
      },
      {
        id: 3,
        title: "Test 4",
        releaseDate: "2025-01-01",
        images: { poster: "/test" },
      },
    ]),
}));

describe("<Search />", () => {
  it("renders correctly with initial focus", () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it("closes on Escape click", async () => {
    const fn = vi.fn();
    render(
      <MemoryRouter>
        <Search onClose={fn} />
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    await act(async () => {
      await user.keyboard("[Escape]");
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("closes on click outside", async () => {
    const fn = vi.fn();
    render(
      <MemoryRouter>
        <Search onClose={fn} />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    await act(async () => {
      await user.click(screen.getByTestId("search-box"));
      await user.click(screen.getByRole("textbox"));
    });
    expect(fn).toHaveBeenCalledTimes(0);

    await act(async () => {
      await user.click(screen.getByTestId("backdrop"));
    });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("changes input value on type", async () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>,
    );
    expect(screen.getByRole("textbox")).toHaveValue("");

    const user = userEvent.setup();
    await act(async () => {
      await user.keyboard("test");
    });

    expect(screen.getByRole("textbox")).toHaveValue("test");
  });

  it("shows the results and button on search", async () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    await act(async () => {
      await user.keyboard("test");
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    });

    for (let i = 1; i < 4; i += 1) {
      expect(screen.getByText(`Test ${i}`)).toBeInTheDocument();
    }

    expect(screen.queryByText("Test 4")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /see more results/i }),
    ).toBeInTheDocument();
  });
});
