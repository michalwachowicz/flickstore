import { Link } from "react-router-dom";
import ChevronIcon from "@/Assets/images/icons/chevron.svg?react";

interface Props {
  title: string;
  marginX?: number;
  route?: string;
}

const SectionHeader = ({ title, marginX = 0, route = undefined }: Props) => (
  <div className={`mx-${marginX} mb-6 flex items-center gap-4`}>
    <h2 className="text-2xl font-bold text-amber-400">{title}</h2>
    {route && (
      <Link to={route} className="flex items-center gap-1 text-neutral-500">
        See more <ChevronIcon className="h-4 w-4 [&>path]:fill-neutral-500" />
      </Link>
    )}
  </div>
);

export default SectionHeader;
