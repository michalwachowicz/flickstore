import React, { useCallback, useEffect, useRef, useState } from "react";
import CarouselButtons from "@/Components/carousel/CarouselButtons";

type VisibleCountObject = {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

interface Props {
  visibleCount: number | VisibleCountObject;
  autoSlide?: number;
  marginX?: number;
  onPrev?: () => void;
  onNext?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

const getBreakpointValue = (visibleCount: VisibleCountObject): number => {
  const breakpoints: { query: string; key: keyof VisibleCountObject }[] = [
    { query: "(min-width: 1280px)", key: "xl" },
    { query: "(min-width: 1024px)", key: "lg" },
    { query: "(min-width: 768px)", key: "md" },
    { query: "(min-width: 640px)", key: "sm" },
  ];

  for (let i = 0; i < breakpoints.length; i += 1) {
    const { query, key } = breakpoints[i];
    const count = visibleCount[key];

    if (window.matchMedia(query).matches && count !== undefined) return count;
  }

  return visibleCount.sm || 1;
};

const Carousel = ({
  visibleCount,
  autoSlide = -1,
  marginX = 0,
  onPrev = () => {},
  onNext = () => {},
  children,
}: Props) => {
  const childArr = React.Children.toArray(children);
  const childCount = childArr.length;

  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentVisibleCount, setCurrentVisibleCount] = useState(
    typeof visibleCount === "number" ? visibleCount : 1,
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const goPrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - currentVisibleCount;
      return newIndex < 0
        ? Math.max(childCount - currentVisibleCount, 0)
        : newIndex;
    });

    onPrev();
  };

  const goNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + currentVisibleCount;
      return newIndex >= childCount ? 0 : newIndex;
    });

    onNext();
  }, [onNext, childCount, currentVisibleCount]);

  useEffect(() => {
    if (autoSlide === -1) return () => {};

    const slideInterval = setInterval(goNext, autoSlide);
    return () => {
      clearInterval(slideInterval);
    };
  }, [autoSlide, goNext]);

  useEffect(() => {
    if (typeof visibleCount === "number") {
      setCurrentVisibleCount(visibleCount);
      return () => {};
    }

    const updateVisibleCount = () => {
      setCurrentVisibleCount(getBreakpointValue(visibleCount));
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, [visibleCount]);

  useEffect(() => {
    const updateCarouselWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.clientWidth);
      }
    };

    updateCarouselWidth();
    window.addEventListener("resize", updateCarouselWidth);

    return () => {
      window.removeEventListener("resize", updateCarouselWidth);
    };
  }, [marginX, currentVisibleCount]);

  const gapSize =
    0.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const childWidth =
    (carouselWidth - (currentVisibleCount - 1) * gapSize) / currentVisibleCount;
  const translateX = currentIndex * (childWidth + gapSize);

  return (
    <div className="relative max-w-full">
      <div
        className="overflow-hidden"
        style={{
          marginLeft: `${marginX}rem`,
          marginRight: `${marginX}rem`,
        }}
      >
        <div
          ref={carouselRef}
          data-testid="carousel"
          className="flex gap-2 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {childArr.map((child, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} style={{ flex: `0 0 ${childWidth}px` }}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <CarouselButtons onPrev={goPrev} onNext={goNext} />
    </div>
  );
};

export default Carousel;
