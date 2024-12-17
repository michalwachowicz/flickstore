export default interface Movie {
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
    cast: number[];
    crew: number[];
  };
}
