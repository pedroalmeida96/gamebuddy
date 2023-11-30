import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import Game from "./types/game";
import GameType from "./types/gameType";
import AppUser from "./types/appuser";
import { Link } from "react-router-dom";
import EditGameModal from "./editgame.modal";

type GamesListProps = {
    gamesList: Array<Game>;
    gameTypes: Array<GameType>;
    users: Array<AppUser>;
    retrieveGames: () => void;
};

function GamesList({ gamesList, gameTypes, users, retrieveGames }: GamesListProps) {
    const [editingGame, setEditingGame] = useState<Game | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<Array<AppUser>>([]);

    const editGame = (game: Game) => {
        console.log(game);
        setEditingGame(game);
        setIsEditing(true)
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

    const updateGame = (updatedGame: Game) => {
        if (editingGame) {
            axios
                .put(
                    "http://localhost:8080/api/games/update", updatedGame,
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

    function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedIds = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        const selectedUserObjects = users.filter((user) => {
            console.log(`user.userId: ${user.userId}, selectedIds: ${selectedIds}`);
            return selectedIds.includes(user.userId.toString());
        });
        setSelectedUsers(selectedUserObjects);
    }

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
                            <button onClick={() => editGame(game)}>Edit</button>
                        </li>
                    ))}
            </ul>
            {editingGame && (
                <>
                    <EditGameModal isOpen={isEditing} onClose={() => setIsEditing(false)} retrieveGames={retrieveGames} gameTypes={gameTypes} users={users} editingGame={editingGame} />
                    <div>
                        <h3>Edit Game</h3>
                        <div>
                            <label htmlFor="gameId">Game Id</label>
                            <span id="gameIdText">{editingGame.gameId}</span>
                        </div>
                        <div>
                            <label htmlFor="location">Location</label>
                            <input type="text" id="location" name="location" value={editingGame.location} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="gameDateTime">Game DateTime</label>
                            <input type="datetime-local" id="gameDateTime" name="gameDateTime" value={editingGame.gameDateTime} onChange={handleInputChange} />
                        </div>
                        <div>
                            <select id="users" multiple value={selectedUsers.map((user) => user.userId)} onChange={handleChange}>
                                {users &&
                                    users.map((user, index) => (
                                        <option key={index} value={user.userId}>
                                            {user.userId} {user.name}
                                        </option>
                                    ))}
                            </select>
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
                        <button onClick={() => {
                            const updatedGame: Game = {
                                gameId: editingGame.gameId,
                                location: editingGame.location,
                                gameDateTime: editingGame.gameDateTime,
                                gameType: editingGame.gameType,
                                participants: selectedUsers,
                            };
                            updateGame(updatedGame);
                        }}>Update</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </div></>
            )}
        </div>
    );
}

export default GamesList;
