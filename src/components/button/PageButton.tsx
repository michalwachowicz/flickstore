interface Props {
  page: number;
  isActive?: boolean;
  onClick?: (page: number) => void;
}

const PageButton = ({ page, isActive = false, onClick = () => {} }: Props) => {
  const activeClasses = ["text-neutral-950", "bg-amber-400"];
  const activeStr = `${isActive ? activeClasses.join(" ") : ""}`;

  return (
    <button
      type="button"
      onClick={() => onClick(page)}
      className={`rounded px-3.5 py-1.5 text-xl font-bold text-amber-400 ${activeStr}`}
    >
      {page}
    </button>
  );
};

export default PageButton;
