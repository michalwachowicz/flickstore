import GridIcon from "@/Assets/images/icons/grid.svg?react";
import ListIcon from "@/Assets/images/icons/list.svg?react";

interface Props {
  isList?: boolean;
  onClick?: () => void;
}

const ViewIconButton = ({ isList = false, onClick = () => {} }: Props) => {
  const iconClass = "[&>path]:fill-neutral-950 w-6 h-6";

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-amber-400 p-1.5 transition-transform hover:scale-105"
      aria-label={`Switch to ${isList ? "grid" : "list"} view`}
    >
      {isList ? (
        <ListIcon data-testid="list-icon" className={iconClass} />
      ) : (
        <GridIcon data-testid="grid-icon" className={iconClass} />
      )}
    </button>
  );
};

export default ViewIconButton;
