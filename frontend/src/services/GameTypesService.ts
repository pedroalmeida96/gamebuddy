import http from "../http/http-common";
import GameTypeData from "../types/gameType";

class GameTypeDataService {
  getAll() {
    return http.get<Array<GameTypeData>>("/gameTypes");
  }
}

export default new GameTypeDataService();