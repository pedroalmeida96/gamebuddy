import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Game from "./types/game";
import GameType from "./types/gameType";
import GamesList from "./gameslist.component";
import GameTypes from "./gamestypelist.component";

type GamesPageProps = {};

function GamesPage(props: GamesPageProps) {
  const [games, setGames] = useState<Array<Game>>([]);
  const [gameTypes, setGameTypes] = useState<Array<GameType>>([]);
  const [gameId, setGameId] = useState<any>("");
  const [location, setLocation] = useState<string>("");
  const [gameDateTime, setGameDateTime] = useState<string>("");
  const [selectedGameType, setSelectedGameType] = useState<string>("");
  const [isCreatingNewGame, setIsCreatingNewGame] = useState<boolean>(false);

  useEffect(() => {
    retrieveGames();
    retrieveGameTypes();
  }, []);

  const toggleCreateFields = () => {
    setIsCreatingNewGame(!isCreatingNewGame);
  };


  const retrieveGames = () => {
    axios
      .get("http://localhost:8080/api/games", {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      })
      .then((response: any) => {
        setGames(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const retrieveGameTypes = () => {
    axios
      .get("http://localhost:8080/api/gameTypes", {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      })
      .then((response: any) => {
        const gameTypes = response.data.map((sportsName: string) => ({
          sportsName,
        }));
        setGameTypes(gameTypes);
        console.log("gametype", gameTypes);
      })
      .catch((e: Error) => {
        console.log("Error:", e);
      });
  };

  const onChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setGameDateTime(e.target.value);
  };


  const saveGame = () => {
    const data: Game = {
      location: location,
      gameDateTime: gameDateTime,
      gameType: selectedGameType,
      participants: [
        {
          userId: "1",
          name: "Alice",
        },
      ],
    };

    axios
      .post("http://localhost:8080/api/games/create", data, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      })
      .then((response: any) => {
        setGameId(response.data.gameId);
        setLocation("");
        setGameDateTime("");
        setSelectedGameType("");
        console.log(response.data);
        retrieveGames();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };


  return (
    <div>
      <h2>GAMES</h2>
      <button onClick={toggleCreateFields}>Create New Game</button>
      <GamesList gamesList={games} retrieveGames={retrieveGames} gameTypes={gameTypes} />
      {isCreatingNewGame && (
        <div>
          <h3>Create New Game</h3>
          <div>
            <div>
              <div>
                <label htmlFor="location">Location</label>
                <input type="text" id="location" required value={location} onChange={onChangeLocation} name="location" />
              </div>
              <div>
                <label htmlFor="gameDateTime">Game DateTime</label>
                <input type="datetime-local" id="gameDateTime" required value={gameDateTime} onChange={onChangeDate} name="gameDateTime" />
              </div>
              <div>
                <label htmlFor="gameType">Game Type</label>
                <select id="gameType" value={selectedGameType} onChange={(e) => setSelectedGameType(e.target.value)}>
                  <option value="">Select a game type</option>
                  {gameTypes &&
                    gameTypes.map((gameType, index) => (
                      <option key={index} value={gameType.sportsName}>
                        {gameType.sportsName}
                      </option>
                    ))}
                </select>
              </div>
              <button onClick={saveGame}>Create</button>
            </div>
          </div>
        </div>
      )}
      <GameTypes gameTypeList={gameTypes} />
    </div>
  );
}

export default GamesPage;
