import { ApiCastMember, ApiCrewMember, CastMember, CrewMember } from "./Credit";

export interface ApiMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  runtime?: number;
  videos?: {
    results: {
      id: string;
      site: string;
      name: string;
    }[];
  };
  images?: {
    backdrops?: string[];
  };
  genre_ids?: number[];
  genres?: { id: number }[];
  credits?: {
    cast?: ApiCastMember[];
    crew?: ApiCrewMember[];
  };
  similar?: {
    results?: ApiMovie[];
  };
}

export interface Movie {
  title: string;
  releaseDate: string;
  images: {
    poster: string;
    backdrops?: string[];
  };
  description?: string;
  runtime?: number;
  genres?: number[];
  similar?: number[];
  video?: string;
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}
