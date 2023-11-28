import { useState, ChangeEvent } from "react";
import axios from "axios";
import Modal from "react-modal";
import Game from "./types/game";
import GameType from "./types/gameType";
import AppUser from "./types/appuser";

interface CreateGameModalProps {
    isOpen: boolean;
    onClose: () => void;
    retrieveGames: () => void;
    gameTypes: Array<GameType>;
    users: Array<AppUser>;
}

function CreateGameModal(props: CreateGameModalProps) {
    const [location, setLocation] = useState<string>("");
    const [gameDateTime, setGameDateTime] = useState<string>("");
    const [selectedGameType, setSelectedGameType] = useState<string>("");
    const [selectedUsers, setSelectedUsers] = useState<Array<AppUser>>([]);

    const onChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };

    const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        setGameDateTime(e.target.value);
    };

    const saveGame = (game: Game) => {
        axios
            .post("http://localhost:8080/api/games/create", game, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-type": "application/json",
                },
            })
            .then((response: any) => {
                setLocation("");
                setGameDateTime("");
                setSelectedGameType("");
                setSelectedUsers([]);
                console.log(response.data);
                props.retrieveGames();
                props.onClose(); // Close the modal after creating the game
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedIds = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        const selectedUserObjects = props.users.filter((user) =>
            selectedIds.includes(user.userId.toString())
        );
        setSelectedUsers(selectedUserObjects);
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onClose}
            contentLabel="Create New Game"
        >
            <h3>Create New Game</h3>
            <div>
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    required
                    value={location}
                    onChange={onChangeLocation}
                    name="location"
                />
            </div>
            <div>
                <label htmlFor="gameDateTime">Game DateTime</label>
                <input
                    type="datetime-local"
                    id="gameDateTime"
                    required
                    value={gameDateTime}
                    onChange={onChangeDate}
                    name="gameDateTime"
                />
            </div>
            <div>
                <label htmlFor="gameType">Game Type</label>
                <select
                    id="gameType"
                    value={selectedGameType}
                    onChange={(e) => setSelectedGameType(e.target.value)}
                >
                    <option value="">Select a game type</option>
                    {props.gameTypes &&
                        props.gameTypes.map((gameType, index) => (
                            <option key={index} value={gameType.sportsName}>
                                {gameType.sportsName}
                            </option>
                        ))}
                </select>
            </div>
            <div>
                <select
                    id="users"
                    multiple
                    value={selectedUsers.map((user) => user.userId)}
                    onChange={handleChange}
                >
                    {props.users &&
                        props.users.map((user, index) => (
                            <option key={index} value={user.userId}>
                                {user.userId} {user.name}
                            </option>
                        ))}
                </select>
            </div>
            <button className="btn btn-secondary" onClick={() => saveGame({ location, gameDateTime, gameType: selectedGameType, participants: selectedUsers })}>Create</button>
            <button className="btn btn-secondary" onClick={props.onClose}>Cancel</button>
        </Modal>
    );
};

export default CreateGameModal;
