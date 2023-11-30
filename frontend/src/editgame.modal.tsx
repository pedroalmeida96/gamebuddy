import { useState, ChangeEvent } from "react";
import { Modal, Button } from "react-bootstrap";
import Game from "./types/game";
import GameType from "./types/gameType";
import AppUser from "./types/appuser";

interface EditGameModalProps {
    isOpen: boolean;
    onClose: () => void;
    retrieveGames: () => void;
    gameTypes: Array<GameType>;
    users: Array<AppUser>;
    editingGame: Game;
}

function EditGameModal(props: EditGameModalProps) {
    const [location, setLocation] = useState<string>(props.editingGame.location);
    const [gameDateTime, setGameDateTime] = useState<string>(props.editingGame.gameDateTime);
    const [selectedGameType, setSelectedGameType] = useState<string>(props.editingGame.gameType);
    const [selectedUsers, setSelectedUsers] = useState<Array<AppUser>>(props.editingGame.participants);

    const onChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };

    const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        setGameDateTime(e.target.value);
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
        <Modal show={props.isOpen} onHide={props.onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create New Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        required
                        value={location}
                        onChange={onChangeLocation}
                        name="location"
                        className="form-control"
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
                        className="form-control"
                    />
                </div>
                <div>
                    <label htmlFor="gameType">Game Type</label>
                    <select
                        id="gameType"
                        value={selectedGameType}
                        onChange={(e) => setSelectedGameType(e.target.value)}
                        className="form-control"
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
                    <label htmlFor="users">Participants</label>
                    <select
                        id="users"
                        multiple
                        value={selectedUsers.map((user) => user.userId)}
                        onChange={handleChange}
                        className="form-control"
                    >
                        {props.users &&
                            props.users.map((user, index) => (
                                <option key={index} value={user.userId}>
                                    {user.userId} {user.name}
                                </option>
                            ))}
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditGameModal;
