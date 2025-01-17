import { act } from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Carousel from "@/Components/Carousel";

describe("<Carousel />", () => {
  const ITEMS_COUNT = 10;
  const mockChildren = Array.from({ length: ITEMS_COUNT }, (_, i) => (
    <div key={i} data-testid={`carousel-item-${i}`}>
      Item {i}
    </div>
  ));

  const getItemIndex = (item: HTMLElement) =>
    parseInt(item.dataset.testid?.split("-")[2] || "0", 10);

  const mockBoundingClientRect = (
    itemCount: number,
    startLeft = 0,
    itemWidth = 100,
    gap = 8,
  ) => {
    Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
      configurable: true,
      value() {
        const fullWidth = gap + itemWidth;
        const containerWidth = fullWidth * itemCount;

        if (this.dataset.testid && this.dataset.testid === "carousel") {
          return { width: containerWidth, left: 0, right: containerWidth };
        }

        const index = getItemIndex(this);
        const left = startLeft + index * fullWidth;
        return {
          left,
          right: left + itemWidth,
          width: itemWidth,
          height: 50,
          bottom: 50,
        };
      },
    });
  };

  const getVisibleItems = (parent: HTMLElement) => {
    const parentRect = parent.getBoundingClientRect();

    return screen.getAllByTestId(/carousel-item/i).filter((item) => {
      const itemRect = item.getBoundingClientRect();
      return (
        itemRect.left >= parentRect.left && itemRect.right <= parentRect.right
      );
    });
  };

  const timeout = (ms: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  it("renders all children", () => {
    render(<Carousel visibleCount={3}>{mockChildren}</Carousel>);

    const items = screen.getAllByTestId(/carousel-item/i);
    expect(items.length).toBe(ITEMS_COUNT);
  });

  it("shows the proper amount of elements on screen", () => {
    const itemCount = 2;

    render(<Carousel visibleCount={itemCount}>{mockChildren}</Carousel>);
    mockBoundingClientRect(itemCount);

    const carousel = screen.getByTestId("carousel");
    const visibleItems = getVisibleItems(carousel);

    expect(visibleItems.length).toBe(itemCount);
  });

  it("moves to next elements on button clicks", async () => {
    const itemCount = 2;
    let startLeft = 0;

    const onPrev = vi.fn(() => {
      startLeft -= 216;
      mockBoundingClientRect(itemCount, startLeft);
    });

    const onNext = vi.fn(() => {
      startLeft += 216;
      mockBoundingClientRect(itemCount, startLeft);
    });

    render(
      <Carousel visibleCount={itemCount} onPrev={onPrev} onNext={onNext}>
        {mockChildren}
      </Carousel>,
    );

    mockBoundingClientRect(itemCount, startLeft);

    const user = userEvent.setup();
    const carousel = screen.getByTestId("carousel");

    getVisibleItems(carousel).forEach((item, index) => {
      expect(getItemIndex(item)).toBe(index);
    });

    const nextBtn = screen.getByRole("button", { name: /next/i });

    await act(async () => {
      await user.click(nextBtn);
      await timeout(500);
    });

    getVisibleItems(carousel).forEach((item, index) => {
      expect(getItemIndex(item)).toBe(index + 2);
    });

    const prevBtn = screen.getByRole("button", { name: /prev/i });
    await act(async () => {
      await user.click(prevBtn);
      await timeout(500);
    });

    getVisibleItems(carousel).forEach((item, index) => {
      expect(getItemIndex(item)).toBe(index);
    });
  });

  it("automatically moves to next elements on screen", async () => {
    const itemCount = 2;

    render(
      <Carousel visibleCount={itemCount} autoSlide={500}>
        {mockChildren}
      </Carousel>,
    );
    mockBoundingClientRect(itemCount);

    await act(async () => {
      await timeout(1000);
      mockBoundingClientRect(itemCount, 216);
    });

    const carousel = screen.getByTestId("carousel");

    getVisibleItems(carousel).forEach((item, index) => {
      expect(getItemIndex(item)).toBe(index + 2);
    });
  });
});
