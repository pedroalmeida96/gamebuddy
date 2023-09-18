import { useEffect, useState } from "react";
import axios from "axios";

interface Game {
  gameId: number;
  location: string;
  gameDateTime: string;
}

function MyGamesPage() {
  const [games, setGames] = useState([]);
  const token = "TOKEN_HERE";

  useEffect(() => {
    const headers = {
      Authorization: token,
    };
    const url = "http://localhost:8080/api/games";
    axios
      .get(url, { headers })
      .then((response) => {
        // Update the state with the retrieved data
        console.log(response.data);
        setGames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  return (
    <div>
      <h2>GAMES</h2>
      <ul>
        {games.map((game: Game) => (
          <li key={game.gameId}>
            <strong>Location:</strong> {game.location}, <strong>Genre:</strong>{" "}
            {game.gameDateTime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyGamesPage;
