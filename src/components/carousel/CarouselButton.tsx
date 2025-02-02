import ChevronIcon from "@/Assets/images/icons/chevron.svg?react";

const CarouselButton = ({
  flipped = false,
  onClick = () => {},
}: {
  flipped?: boolean;
  onClick?: () => void;
}) => (
  <button
    type="button"
    aria-label={`${flipped ? "Previous" : "Next"}`}
    onClick={onClick}
    className={`btn-carousel absolute top-1/2 z-10 -translate-y-1/2 ${flipped ? "left-0" : "right-0"}`}
  >
    <div className="btn-carousel-bg" />
    <ChevronIcon
      className={`h-6 w-6 [&>path]:fill-amber-400 ${flipped ? "flipped-x" : ""} relative z-10`}
    />
  </button>
);

export default CarouselButton;
