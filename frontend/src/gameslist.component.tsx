import { useState } from "react";
import Game from "./types/game";
import GameType from "./types/gameType";
import AppUser from "./types/appuser";
import EditGameModal from "./editgame.modal";
import BaseService from "./service/base.service";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './gameslist.component.css';

type GamesListProps = {
    gamesList: Array<Game>;
    gameTypes: Array<GameType>;
    users: Array<AppUser>;
    retrieveGames: () => void;
};

function GamesList(props: GamesListProps) {
    const [editingGame, setEditingGame] = useState<Game | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [favoriteGames, setFavoriteGames] = useState<Array<Game>>([]);

    const editGame = (game: Game) => {
        setEditingGame(game);
        setIsEditing(true)
    };

    const deleteGame = (gameId: any) => {
        BaseService.delete("/games/delete/" + gameId)
            .then(() => {
                console.log("Game deleted successfully");
                props.retrieveGames();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const toggleFavorite = (game: Game) => {
        if (favoriteGames.some((favGame) => favGame.gameId === game.gameId)) {
            setFavoriteGames((prevFavoriteGames) =>
                prevFavoriteGames.filter((favGame) => favGame.gameId !== game.gameId)
            );
        } else {
            setFavoriteGames((prevFavoriteGames) => [...prevFavoriteGames, game]);
        }
    };

    return (
        <>
            {props.gamesList && (
                <Table striped >
                    <thead>
                        <tr>
                            <th>Game ID</th>
                            <th>Location</th>
                            <th>Game Date/Time</th>
                            <th>Game Type</th>
                            <th>Participants</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.gamesList.map((game) => (
                            <tr key={game.gameId}>
                                <td>{game.gameId}</td>
                                <td>{game.location}</td>
                                <td>{game.gameDateTime}</td>
                                <td>{game.gameType}</td>
                                <td>
                                    {game.participants.map((user, participantIndex) => (
                                        <span key={participantIndex}>
                                            {user.userId} - {user.name}
                                            {participantIndex < game.participants.length - 1 && ", "}
                                        </span>
                                    ))}
                                </td>
                                <td className="games-list-actions">
                                    <FontAwesomeIcon icon={faStar} className="star-icon" style={{ color: favoriteGames.some((favGame) => favGame.gameId === game.gameId) ? 'gold' : 'gray' }} onClick={() => toggleFavorite(game)} />
                                    <Button variant="danger" onClick={() => deleteGame(game.gameId)}>Delete</Button>
                                    <Button variant="primary" onClick={() => editGame(game)}>Edit</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {editingGame && (
                <EditGameModal isOpen={isEditing} onClose={() => setIsEditing(false)} retrieveGames={props.retrieveGames} gameTypes={props.gameTypes} users={props.users} editingGame={editingGame} />
            )}
        </>
    );
}

export default GamesList;
