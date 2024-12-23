import {
  ApiCredit,
  CastMember,
  Credit,
  CrewMember,
} from "../interfaces/Credit";

const createCreditFromApi = (apiCredit: ApiCredit): CrewMember | CastMember => {
  const credit: Credit = {
    name: apiCredit.name,
    department: apiCredit.known_for_department,
    image: apiCredit.profile_path,
  };

  if ("job" in apiCredit) {
    return { ...credit, job: apiCredit.job } as CrewMember;
  }

  if ("character" in apiCredit) {
    return { ...credit, character: apiCredit.character } as CastMember;
  }

  return credit as CrewMember | CastMember;
};

export default createCreditFromApi;
