import createCreditFromApi from "../creditsManager";
import { ApiCastMember, ApiCrewMember } from "../../interfaces/Credit";

describe("creditsManager", () => {
  describe("createCreditFromApi()", () => {
    it("transforms data to a crew member", () => {
      const credit = createCreditFromApi({
        name: "Test",
        known_for_department: "Production",
        profile_path: "test",
        job: "Editing",
      } as ApiCrewMember);

      expect(credit).toEqual({
        name: "Test",
        department: "Production",
        image: "test",
        job: "Editing",
      });
    });

    it("transforms data to a cast member", () => {
      const credit = createCreditFromApi({
        name: "Test",
        known_for_department: "Acting",
        profile_path: "test",
        character: "Test",
      } as ApiCastMember);

      expect(credit).toEqual({
        name: "Test",
        department: "Acting",
        image: "test",
        character: "Test",
      });
    });
  });
});
