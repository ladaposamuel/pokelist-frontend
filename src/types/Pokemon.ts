import { Favorite } from "./Favorite";

export interface Pokemon {
  id: string | number;
  name: string;
  image: string;
  description: string;
  type: string;
  favorites: Favorite[]
}
