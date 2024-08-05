import { Pokemon } from "./Pokemon";
export interface Organisation {
  id: string | number;
  name: string;
  createdAt: string;
  updatedAt: string;
  pokemons: Pokemon[];
}
