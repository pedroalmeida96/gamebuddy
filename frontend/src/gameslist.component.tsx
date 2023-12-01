import { useState } from "react";
import Game from "./types/game";
import GameType from "./types/gameType";
import AppUser from "./types/appuser";
import EditGameModal from "./editgame.modal";
import BaseService from "./service/base.service";

type GamesListProps = {
    gamesList: Array<Game>;
    gameTypes: Array<GameType>;
    users: Array<AppUser>;
    retrieveGames: () => void;
};

function GamesList({ gamesList, gameTypes, users, retrieveGames }: GamesListProps) {
    const [editingGame, setEditingGame] = useState<Game | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const editGame = (game: Game) => {
        setEditingGame(game);
        setIsEditing(true)
    };

    const deleteGame = (gameId: any) => {
        BaseService.delete("/games/delete/" + gameId)
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
                                {game.gameId}, {game.location}, {game.gameDateTime}, {game.gameType}, Participants:{" "}
                                {game.participants.map((user, participantIndex) => (
                                    <span key={participantIndex}>
                                        {user.userId} - {user.name}
                                        {participantIndex < game.participants.length - 1 && ", "}
                                    </span>
                                ))}
                            </span>
                            <button onClick={() => deleteGame(game.gameId)}>Delete</button>
                            <button onClick={() => editGame(game)}>Edit</button>
                        </li>
                    ))}
            </ul>
            {editingGame && (
                <EditGameModal isOpen={isEditing} onClose={() => setIsEditing(false)} retrieveGames={retrieveGames} gameTypes={gameTypes} users={users} editingGame={editingGame} />
            )}
        </div>
    );
}

export default GamesList;
