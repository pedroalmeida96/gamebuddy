import { useState, ChangeEvent } from "react";
import { Modal, Button } from "react-bootstrap";
import Game from "./types/game";
import GameType from "./types/gameType";
import AppUser from "./types/appuser";
import BaseService from "./service/base.service";

interface EditGameModalProps {
    isOpen: boolean;
    onClose: () => void;
    retrieveGames: () => void;
    gameTypes: Array<GameType>;
    users: Array<AppUser>;
    editingGame: Game;
}

function EditGameModal(props: EditGameModalProps) {
    const [selectedUsers, setSelectedUsers] = useState<Array<AppUser>>([]);
    const [location, setLocation] = useState<string>(props.editingGame.location);
    const [gameDateTime, setGameDateTime] = useState<string>(props.editingGame.gameDateTime);
    const [selectedGameType, setSelectedGameType] = useState<string>(props.editingGame.gameType);

    function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedIds = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        const selectedUserObjects = props.users.filter((user) => selectedIds.includes(user.userId.toString()));
        setSelectedUsers(selectedUserObjects);
    }

    const handleEdit = async () => {
        const updatedGame: Game = {
            ...props.editingGame,
            location: location,
            gameDateTime: gameDateTime,
            gameType: selectedGameType,
            participants: selectedUsers,
        };

        try {
            const response = await BaseService.update<Game>("/games/update", updatedGame);
            if (response.status) {
                props.retrieveGames();
                props.onClose();
            } else {
                console.error(response.exception);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal show={props.isOpen} onHide={props.onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label htmlFor="gameId">Game ID</label>
                    <div id="gameId">{props.editingGame.gameId}</div>
                </div>
                <div>
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" required value={location} onChange={(e) => setLocation(e.target.value)} name="location" className="form-control" />
                </div>
                <div>
                    <label htmlFor="gameDateTime">Game DateTime</label>
                    <input type="datetime-local" id="gameDateTime" required value={gameDateTime} onChange={(e) => setGameDateTime(e.target.value)} name="gameDateTime" className="form-control" />
                </div>
                <div>
                    <label htmlFor="gameType">Game Type</label>
                    <select id="gameType" value={selectedGameType} onChange={(e) => setSelectedGameType(e.target.value)} className="form-control">
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
                    <select id="users" multiple value={selectedUsers.map((user) => user.userId)} onChange={handleChange}>
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
                <Button variant="primary" onClick={handleEdit}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditGameModal;
