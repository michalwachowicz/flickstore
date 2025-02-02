import { CastMember, CrewMember } from "../interfaces/Credit";
import { getImageUrl } from "../api/moviesApi";
import ProfilePicture from "@/Components/ProfilePicture";

const CreditListItem = ({ member }: { member: CrewMember | CastMember }) => {
  let additional = "";

  if ("character" in member) {
    additional = member.character || "";
  } else if ("job" in member) {
    additional = member.job || "";
  }

  return (
    <li className="flex items-center gap-4">
      <ProfilePicture
        image={member.image ? getImageUrl(member.image, 185) : undefined}
        alt={member.name}
      />
      <div>
        <div className="text-lg font-bold text-neutral-200">{member.name}</div>
        {additional !== "" && (
          <div className="mt-2 text-neutral-400">{additional}</div>
        )}
      </div>
    </li>
  );
};

export default CreditListItem;
