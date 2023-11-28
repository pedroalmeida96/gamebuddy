import { useState, useEffect } from "react";
import axios from "axios";
import Game from "./types/game";
import GameType from "./types/gameType";
import GamesList from "./gameslist.component";
import GameTypes from "./gamestypelist.component";
import AppUser from "./types/appuser";
import CreateGameModal from "./creategame.modal";

type GamesPageProps = {};

function GamesPage(_props: GamesPageProps) {
  const [games, setGames] = useState<Array<Game>>([]);
  const [gameTypes, setGameTypes] = useState<Array<GameType>>([]);
  const [users, setusers] = useState<Array<AppUser>>([]);
  const [isCreatingNewGame, setIsCreatingNewGame] = useState<boolean>(false);

  useEffect(() => {
    retrieveGames();
    retrieveGameTypes();
    retrieveUsers();
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

  const retrieveUsers = () => {
    axios
      .get("http://localhost:8080/api/users", {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      })
      .then((response: any) => {
        setusers(response.data);
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

  const closeModal = () => {
    setIsCreatingNewGame(false);
  };

  return (
    <div>
      <h2>GAMES</h2>
      <button onClick={toggleCreateFields}>Create New Game</button>
      <CreateGameModal isOpen={isCreatingNewGame} onClose={closeModal} retrieveGames={retrieveGames} gameTypes={gameTypes} users={users} />
      <GamesList gamesList={games} retrieveGames={retrieveGames} users={users} gameTypes={gameTypes} />
      <GameTypes gameTypeList={gameTypes} />
    </div>
  );
}

export default GamesPage;
