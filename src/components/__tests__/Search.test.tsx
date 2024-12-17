import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Search from "@/Components/Search";

describe("<Search />", () => {
  it("renders correctly with initial focus", () => {
    render(<Search />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it("closes on Escape click", async () => {
    const fn = vi.fn();
    render(<Search onClose={fn} />);

    const user = userEvent.setup();
    await user.keyboard("[Escape]");

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("closes on click outside", async () => {
    const fn = vi.fn();
    render(<Search onClose={fn} />);

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
    render(<Search />);
    expect(screen.getByRole("textbox")).toHaveValue("");

    const user = userEvent.setup();
    await act(async () => {
      await user.keyboard("test");
    });

    expect(screen.getByRole("textbox")).toHaveValue("test");
  });
});
