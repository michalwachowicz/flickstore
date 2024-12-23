export interface Credit {
  name: string;
  department: string;
  image?: string;
}

export interface ApiCredit {
  name: string;
  known_for_department: string;
  profile_path: string;
}

export interface CrewMember extends Credit {
  job?: string;
}

export interface ApiCrewMember extends ApiCredit {
  job?: string;
}

export interface CastMember extends Credit {
  character?: string;
}

export interface ApiCastMember extends ApiCredit {
  character?: string;
}
