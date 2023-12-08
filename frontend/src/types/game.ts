import AppUser from "./appuser";

export default interface Game {
  gameId?: any | null;
  location: string;
  gameType: string;
  participants: Array<AppUser>;
  gameDateTime: string;
  favorite: boolean;
}
