import http from "../http/http-common";
import AppUser from "../types/appuser";

class AppUsersService {
  getAll() {
    return http.get<Array<AppUser>>("/users");
  }
}

export default new AppUsersService();