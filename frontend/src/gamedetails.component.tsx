import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Card, FormControl, ListGroup } from "react-bootstrap";
import Game from "./types/game";

function GameDetails() {
    const { gameId } = useParams<{ gameId: string }>();
    const [game, setGame] = useState<Game | null>(null);
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        // Fetch game details based on gameId
        axios
            .get(`http://localhost:8080/api/games/${gameId}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-type": "application/json",
                },
            })
            .then((response: any) => {
                setGame(response.data);
            })
            .catch((error: Error) => {
                console.error("Error fetching game details:", error);
            });
    }, [gameId]);

    if (!game) {
        return <div>Loading...</div>;
    }

    const handleEditClick = () => {
        setIsEditable(true);
    };

    const handleSaveClick = () => {
        const updatedGame: Game = {
            gameId: game.gameId,
            location: game.location,
            gameDateTime: game.gameDateTime,
            gameType: game.gameType,
            participants: game.participants
        };
        if (isEditable) {
            axios.put(
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
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
        setIsEditable(false);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGame((prevGame) => {
            if (prevGame) {
                return {
                    ...prevGame,
                    location: e.target.value,
                };
            }
            return prevGame;
        });
    };

    return (
        <div>
            <h3>Game Details</h3>
            <Card>
                <Card.Body>
                    <Card.Title>Game ID: {game.gameId}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            Location:{" "}
                            {isEditable ? (
                                <FormControl type="text" value={game.location} onChange={handleLocationChange} />) : (game.location)}
                        </ListGroup.Item>
                        <ListGroup.Item>Game Type: {game.gameType}</ListGroup.Item>
                        <ListGroup.Item>Game Date Time: {game.gameDateTime}</ListGroup.Item>
                        <ListGroup.Item>
                            <p>Participants:</p>
                            <ul>
                                {game.participants.map((participant, index) => (
                                    <li key={index}>{participant.name}</li>
                                ))}
                            </ul>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
            {isEditable ? (
                <Button onClick={handleSaveClick}>Save</Button>
            ) : (
                <Button onClick={handleEditClick}>Edit</Button>
            )}
        </div>
    );
}

export default GameDetails;
