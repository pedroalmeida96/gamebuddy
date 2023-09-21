import React, { useState } from "react";
import axios from "axios";
import Game from "./types/game";
import GameType from "./types/gameType";

type GamesListProps = {
    gamesList: Array<Game>;
    gameTypes: Array<GameType>;
    retrieveGames: () => void;
};

function GamesList({ gamesList, gameTypes, retrieveGames }: GamesListProps) {
    const [editingGame, setEditingGame] = useState<Game | null>(null);

    const editGame = (game: Game) => {
        console.log(game);
        setEditingGame(game);
    };

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

    const cancelEdit = () => {
        setEditingGame(null);
    };

    const updateGame = () => {
        if (editingGame) {

            const data: Game = {
                gameId: editingGame.gameId,
                location: editingGame.location,
                gameDateTime: editingGame.gameDateTime,
                gameType: editingGame.gameType,
                participants: [
                    {
                        userId: "1",
                        name: "Alice",
                    },
                ],
            };

            axios
                .put(
                    "http://localhost:8080/api/games/update", data,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                            "Content-type": "application/json",
                        },
                    }
                )
                .then(() => {
                    console.log("Game updated successfully");
                    retrieveGames();
                    setEditingGame(null); // Reset the editing state
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (editingGame) {
            const { name, value } = event.target;
            setEditingGame({
                ...editingGame,
                [name]: value,
            });
        }
    };

    return (
        <div>
            <h3>Games List</h3>
            <ul>
                {gamesList &&
                    gamesList.map((game, index) => (
                        <li key={index}>
                            <span>
                                {game.gameId}, {game.location}, {game.gameDateTime}, {game.gameType}
                            </span>
                            <button onClick={() => deleteGame(game.gameId)}>Delete</button>
                            <button onClick={() => editGame(game)}>Edit</button>
                        </li>
                    ))}
            </ul>
            {editingGame && (
                <div>
                    <h3>Edit Game</h3>
                    <div>
                        <label htmlFor="gameId">Game Id</label>
                        <input
                            type="text"
                            id="gameId"
                            required
                            value={editingGame.gameId}
                            name="gameId"
                        />
                    </div>
                    <div>
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={editingGame.location}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="gameDateTime">Game DateTime</label>
                        <input
                            type="datetime-local"
                            id="gameDateTime"
                            name="gameDateTime"
                            value={editingGame.gameDateTime}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="gameType">Game Type</label>
                        <select id="gameType" value={editingGame.gameType} onChange={handleInputChange} name="gameType">
                            <option value="">Select a game type</option>
                            {gameTypes &&
                                gameTypes.map((gameType, index) => (
                                    <option key={index} value={gameType.sportsName}>
                                        {gameType.sportsName}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <button onClick={updateGame}>Update</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default GamesList;
