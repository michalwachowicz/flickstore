import { Link } from "react-router-dom";

interface Props {
  page: number;
  type: "search" | "genre";
  query: string;
  isActive?: boolean;
  onClick?: (page: number) => void;
}

const PageButton = ({
  page,
  type,
  query,
  isActive = false,
  onClick = () => {},
}: Props) => {
  const activeClasses = ["text-neutral-950", "bg-amber-400"];
  const activeStr = `${isActive ? activeClasses.join(" ") : ""}`;

  return (
    <Link
      to={`/${type}/${query}/${page}`}
      onClick={() => onClick(page)}
      className={`rounded px-3.5 py-1.5 text-xl font-bold text-amber-400 ${activeStr}`}
    >
      {page}
    </Link>
  );
};

export default PageButton;
