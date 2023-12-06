import { useState, useEffect } from "react";
import Game from "./types/game";
import GameType from "./types/gameType";
import GamesList from "./gameslist.component";
import GameTypes from "./gamestypelist.component";
import AppUser from "./types/appuser";
import CreateGameModal from "./creategame.modal";
import BaseService from "./service/base.service";
import { Button, Container } from "react-bootstrap";

function GamesPage() {
  const [games, setGames] = useState<Array<Game>>([]);
  const [gameTypes, setGameTypes] = useState<Array<GameType>>([]);
  const [users, setusers] = useState<Array<AppUser>>([]);
  const [isCreatingNewGame, setIsCreatingNewGame] = useState<boolean>(false);

  useEffect(() => {
    retrieveGames();
    retrieveGameTypes();
    retrieveUsers();
  }, []);


  const retrieveGames = async () => {
    try {
      const response = await BaseService.getAll<Game>("/games");
      if (response.status) {
        setGames(response.data);
        console.log("games", response.data);
      } else {
        console.error(response.exception);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const retrieveUsers = async () => {
    const response = await BaseService.getAll<AppUser>("/users");
    if (response.status) {
      setusers(response.data);
      console.log("users", response.data);
    } else {
      console.error(response.exception);
    }
  };

  const retrieveGameTypes = async () => {
    const response = await BaseService.getAll<AppUser>("/gameTypes");
    if (response.status) {
      const gameTypes = response.data.map((sportsName: string) => ({
        sportsName,
      }));
      setGameTypes(gameTypes);
      console.log("gametype", gameTypes);
    } else {
      console.error(response.exception);
    }
  };

  return (
    <div>
      <Container>
        <h2 className="text-center text-primary">GAMES</h2>
      </Container>
      <CreateGameModal isOpen={isCreatingNewGame} onClose={() => setIsCreatingNewGame(false)} retrieveGames={retrieveGames} gameTypes={gameTypes} users={users} />
      <GamesList gamesList={games} retrieveGames={retrieveGames} users={users} gameTypes={gameTypes} />
      <Button onClick={() => { setIsCreatingNewGame(!isCreatingNewGame) }}>Create New Game</Button>
    </div>
  );
}

export default GamesPage;
