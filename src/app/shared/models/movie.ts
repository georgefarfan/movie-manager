export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  favorite: boolean;
}

export interface MovieResult {
  Search: Movie[];
  totalResults: number;
  Response: string;
}
