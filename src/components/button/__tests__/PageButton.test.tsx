import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import PageButton from "@/Components/button/PageButton";

describe("<PageButton />", () => {
  it("renders with a page number", () => {
    render(<PageButton page={1} />);
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
  });

  it("handles click with the page number", async () => {
    const fn = vi.fn();
    render(<PageButton page={3} onClick={fn} />);

    expect(fn).toHaveBeenCalledTimes(0);

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
  });
});
