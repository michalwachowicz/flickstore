interface Credit {
  name: string;
  department: string;
  image?: string;
}

export interface CrewMember extends Credit {
  job?: string;
}

export interface CastMember extends Credit {
  character?: string;
}
