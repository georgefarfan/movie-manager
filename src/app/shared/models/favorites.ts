import { Movie } from './movie';

export interface Favorite extends Movie {
  description: string;
  rating: number;
}
