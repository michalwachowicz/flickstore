import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import CarouselButton from "@/Components/carousel/CarouselButton";

describe("<CarouselButton />", () => {
  it("renders next button correctly", () => {
    render(<CarouselButton />);

    expect(
      screen.queryByRole("button", { name: /previous/i }),
    ).not.toBeInTheDocument();

    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("renders prev button correctly", () => {
    render(<CarouselButton flipped />);

    expect(
      screen.getByRole("button", { name: /previous/i }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /next/i }),
    ).not.toBeInTheDocument();
  });

  it("reacts to clicks properly", async () => {
    const fn = vi.fn();
    const user = userEvent.setup();

    render(<CarouselButton onClick={fn} />);
    expect(fn).toHaveBeenCalledTimes(0);

    await act(async () => {
      await user.click(screen.getByRole("button"));
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
