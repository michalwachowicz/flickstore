import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import CarouselButtons from "@/Components/CarouselButtons";

describe("<CarouselButtons />", () => {
  it("renders correctly", () => {
    render(<CarouselButtons />);

    expect(
      screen.getByRole("button", { name: /previous/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("reacts to clicks properly", async () => {
    const prevFn = vi.fn();
    const nextFn = vi.fn();
    const user = userEvent.setup();

    render(<CarouselButtons onPrev={prevFn} onNext={nextFn} />);

    const prevBtn = screen.getByRole("button", { name: /previous/i });
    const nextBtn = screen.getByRole("button", { name: /next/i });

    expect(prevFn).toHaveBeenCalledTimes(0);
    expect(nextFn).toHaveBeenCalledTimes(0);

    await user.click(prevBtn);
    expect(prevFn).toHaveBeenCalledTimes(1);

    await user.click(nextBtn);
    expect(nextFn).toHaveBeenCalledTimes(1);
  });
});
