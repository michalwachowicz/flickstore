import React, { useCallback, useEffect, useRef, useState } from "react";
import CarouselButtons from "@/Components/carousel/CarouselButtons";

interface Props {
  visibleCount: number;
  autoSlide?: number;
  marginX?: number;
  onPrev?: () => void;
  onNext?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const goPrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - visibleCount;
      return newIndex < 0 ? Math.max(childCount - visibleCount, 0) : newIndex;
    });

    onPrev();
  };

  const goNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + visibleCount;
      return newIndex >= childCount ? 0 : newIndex;
    });

    onNext();
  }, [onNext, childCount, visibleCount]);

  useEffect(() => {
    if (autoSlide === -1) return () => {};

    const slideInterval = setInterval(goNext, autoSlide);
    return () => {
      clearInterval(slideInterval);
    };
  }, [autoSlide, goNext]);

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
  }, [marginX]);

  const gapSize =
    0.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const childWidth =
    (carouselWidth - (visibleCount - 1) * gapSize) / visibleCount;
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
