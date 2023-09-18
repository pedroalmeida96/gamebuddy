import http from "../http/http-common";
import GameData from "../types/game";

class GameDataService {
  getAll() {
    return http.get<Array<GameData>>("/games");
  }

  create(data: GameData) {
    return http.post<GameData>("/games/create", data);
  }

  delete(id: any) {
    return http.delete<any>(`/games/delete/${id}`);
  }

  get(id: string) {
    return http.get<GameData>(`/tutorials/${id}`);
  }

  update(data: GameData, id: any) {
    return http.put<any>(`/tutorials/${id}`, data);
  }

  deleteAll() {
    return http.delete<any>(`/tutorials`);
  }

  findByTitle(title: string) {
    return http.get<Array<GameData>>(`/tutorials?title=${title}`);
  }
}

export default new GameDataService();