import { render, screen } from "@testing-library/react";
import CreditListItem from "@/Components/CreditListItem";
import { CastMember, CrewMember } from "../../interfaces/Credit";

vi.mock("@/Components/ProfilePicture", () => ({
  default: ({ image = undefined }: { image?: string }) => (
    <div data-testid="picture">{image ? "image" : "empty"}</div>
  ),
}));

describe("<CreditListItem />", () => {
  let member: CrewMember | CastMember;

  beforeEach(() => {
    member = {
      name: "Test",
      department: "Acting",
      image: "test.jpg",
    };
  });

  describe("Profile picture", () => {
    it("renders empty profile picture correctly", () => {
      member.image = undefined;
      render(<CreditListItem member={member} />);

      const picture = screen.getByTestId("picture");
      expect(picture).toBeInTheDocument();
      expect(picture.textContent).toEqual("empty");
    });

    it("renders profile picture correctly", () => {
      render(<CreditListItem member={member} />);

      const picture = screen.getByTestId("picture");
      expect(picture).toBeInTheDocument();
      expect(picture.textContent).toEqual("image");
    });
  });

  describe("Cast", () => {
    it("renders correctly", () => {
      member = { ...member, character: "Character" } as CastMember;
      render(<CreditListItem member={member} />);

      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(
        screen.getByText((member as CastMember).character!),
      ).toBeInTheDocument();
    });
  });

  describe("Crew", () => {
    it("renders correctly", () => {
      member = { ...member, job: "Producer" } as CrewMember;
      render(<CreditListItem member={member} />);

      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByText((member as CrewMember).job!)).toBeInTheDocument();
    });
  });
});
