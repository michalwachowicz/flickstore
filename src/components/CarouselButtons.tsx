import ChevronIcon from "@/Assets/images/icons/chevron.svg?react";

const CarouselButton = ({
  flipped = false,
  title,
  onClick,
}: {
  flipped?: boolean;
  title: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    aria-label={title}
    onClick={onClick}
    className="btn-carousel"
  >
    <div className="btn-carousel-bg" />
    <ChevronIcon
      className={`h-6 w-6 [&>path]:fill-amber-400 ${flipped ? "flipped-x" : ""} relative z-10`}
    />
  </button>
);

const CarouselButtons = ({
  onPrev = () => {},
  onNext = () => {},
}: {
  onPrev?: () => void;
  onNext?: () => void;
}) => (
  <div className="absolute top-1/2 flex w-full -translate-y-1/2 transform justify-between">
    <CarouselButton title="Previous" onClick={onPrev} flipped />
    <CarouselButton title="Next" onClick={onNext} />
  </div>
);

export default CarouselButtons;
