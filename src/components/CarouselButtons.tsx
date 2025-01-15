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
    className="rounded border border-neutral-50 bg-neutral-950 px-1.5 py-3 opacity-50 hover:opacity-75"
  >
    <ChevronIcon
      className={`h-6 w-6 [&>path]:fill-amber-400 ${flipped ? "flipped-x" : ""}`}
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
  <div className="flex w-full justify-between">
    <CarouselButton title="Previous" onClick={onPrev} />
    <CarouselButton title="Next" onClick={onNext} />
  </div>
);

export default CarouselButtons;
