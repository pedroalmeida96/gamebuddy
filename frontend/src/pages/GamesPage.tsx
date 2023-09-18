import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/games";
const INITIAL_FORM_DATA = {
  gameType: "FOOTBALL",
  location: "CONA",
  gameDateTime: "2024-08-25T15:00:00",
  participants: [
    {
      userId: "1",
      name: "Alice",
    },
  ],
};
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlkIjoxLCJleHAiOjE2OTUwNDA2ODR9.WPmdv4GrUadSf-GfUhWijHLdLZ_IO3yy91uAY4KXmuc";

interface Game {
  gameId: number;
  location: string;
  gameDateTime: string;
}

function MyGamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const fetchGames = () => {
    const headers = {
      Authorization: TOKEN,
    };

    axios
      .get(API_URL, { headers })
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL + "/create", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
      });

      if (response.status === 200) {
        // After successfully creating the game, fetch the updated list of games
        const gamesResponse = await axios.get(API_URL, {
          headers: {
            Authorization: TOKEN,
          },
        });

        if (gamesResponse.status === 200) {
          fetchGames();
          setFormData(INITIAL_FORM_DATA); // Reset the form after successful submission
        }
      }
    } catch (error) {
      console.error("Error creating the game:", error);
    }
  };

  return (
    <div>
      <h2>GAMES</h2>
      <ul>
        {games.map((game: Game) => (
          <li key={game.gameId}>
            <strong>Location:</strong> {game.location},{" "}
            <strong>Game Date and Time:</strong> {game.gameDateTime}
          </li>
        ))}
      </ul>
      <div>
        <h1>Insert new game</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="gameDateTime">Game Date and Time:</label>
            <input
              type="datetime-local"
              id="gameDateTime"
              name="gameDateTime"
              value={formData.gameDateTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Create Game</button>
        </form>
      </div>
    </div>
  );
}

export default MyGamesPage;
