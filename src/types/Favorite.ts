import { User } from "./User";

export interface Favorite {
  id: string | number;
  liked: boolean;
  user: User;
}
