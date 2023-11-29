import axios from "axios";
import Game from "./types/game";
import { Link } from "react-router-dom";

type GamesListProps = {
    gamesList: Array<Game>;
    retrieveGames: () => void;
};

function GamesList({ gamesList, retrieveGames }: GamesListProps) {
    const deleteGame = (gameId: any) => {
        axios
            .delete("http://localhost:8080/api/games/delete/" + gameId, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-type": "application/json",
                },
            })
            .then(() => {
                console.log("Game deleted successfully");
                retrieveGames();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div>
            <h3>Games List</h3>
            <ul>
                {gamesList &&
                    gamesList.map((game, index) => (
                        <li key={index}>
                            <span>
                                <Link to={`/games/${game.gameId}`}>{game.gameId}</Link>, {game.location}, {game.gameDateTime}, {game.gameType}, Participants:{" "}
                                {game.participants.map((user, participantIndex) => (
                                    <span key={participantIndex}>
                                        {user.userId} - {user.name}
                                        {participantIndex < game.participants.length - 1 && ", "}
                                    </span>
                                ))}
                            </span>
                            <button onClick={() => deleteGame(game.gameId)}>Delete</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default GamesList;
