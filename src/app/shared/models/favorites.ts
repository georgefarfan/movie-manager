import { Movie } from './movie';

export interface Favorite extends Movie {
  description: string;
  rating: number;
}

export interface FavoriteParams {
  favorite: Favorite;
  action: ActionType;
}

export enum ActionType {
  UPDATE,
  DELETE,
}
