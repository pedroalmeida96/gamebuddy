import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Game from "./types/game";

function GameDetails() {
    const { gameId } = useParams<{ gameId: string }>();
    const [game, setGame] = useState<Game | null>(null);

    useEffect(() => {
        // Fetch game details based on gameId
        axios.get(`http://localhost:8080/api/games/${gameId}`, {
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

    return (
        <div>
            <h3>Game Details</h3>
            <p>Game ID: {game.gameId}</p>
            {/* Display other game details as needed */}
        </div>
    );
}

export default GameDetails;
