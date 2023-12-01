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
    const [location, setLocation] = useState<string>(props.editingGame.location);
    const [gameDateTime, setGameDateTime] = useState<string>(props.editingGame.gameDateTime);
    const [selectedGameType, setSelectedGameType] = useState<string>(props.editingGame.gameType);
    const [selectedUsers, setSelectedUsers] = useState<Array<AppUser>>(props.editingGame.participants);
    const [, setEditGame] = useState<Game>();

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

    const handleEdit = async (updatedGame: Game) => {
        try {
            const response = await BaseService.update<Game>("/games/update", updatedGame);
            if (response.status) {
                setEditGame(response.data);
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
                <Modal.Title>Create New Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" required value={location} onChange={onChangeLocation} name="location" className="form-control" />
                </div>
                <div>
                    <label htmlFor="gameDateTime">Game DateTime</label>
                    <input type="datetime-local" id="gameDateTime" required value={gameDateTime} onChange={onChangeDate} name="gameDateTime" className="form-control" />
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
                        {selectedUsers &&
                            selectedUsers.map((user, index) => (
                                <option key={index} value={user.userId}>
                                    {user.userId} {user.name}
                                </option>
                            ))}
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>Cancel</Button>
                <Button variant="primary" onClick={() => handleEdit(props.editingGame)}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditGameModal;
