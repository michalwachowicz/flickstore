import PersonIcon from "@/Assets/images/icons/person.svg?react";

interface Props {
  image?: string;
  alt?: string;
  iconSize?: number;
  imageSize?: number;
}

const ProfilePicture = ({
  image = undefined,
  alt = undefined,
  iconSize = 4.5,
  imageSize = 6,
}: Props) => (
  <div
    data-testid="profile-picture"
    className="flex items-center justify-center rounded-lg bg-neutral-800"
    style={{ width: `${imageSize}rem`, height: `${imageSize}rem` }}
  >
    {image && (
      <img
        src={image}
        alt={alt}
        className="h-full w-full rounded-lg object-cover"
      />
    )}
    {!image && (
      <PersonIcon
        data-testid="person-icon"
        className={`[&>path]:fill-neutral-500 w-${iconSize} h-${iconSize}`}
        style={{ width: `${iconSize}rem`, height: `${iconSize}rem` }}
      />
    )}
  </div>
);

export default ProfilePicture;
