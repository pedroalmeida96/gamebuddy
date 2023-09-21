import axios from "axios";
import Game from "./types/game";

type GamesListProps = {
    gamesList: Array<Game>;
    retrieveGames: () => void;
};

function GamesList({ gamesList, retrieveGames }: GamesListProps) {

    const editGame = (game: Game) => {
        console.log(game.gameId);
    };

    const deleteGame = (gameId: any) => {
        axios.delete("http://localhost:8080/api/games/delete/" + gameId, {
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-type": "application/json"
            }
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
                                {game.gameId}, {game.location}, {game.gameDateTime}
                            </span>
                            <button onClick={() => deleteGame(game.gameId)}>Delete</button>
                            <button onClick={() => editGame(game)}>Edit</button> {/* Add Edit button */}
                        </li>
                    ))}
            </ul>
        </div>
    );
}
export default GamesList;