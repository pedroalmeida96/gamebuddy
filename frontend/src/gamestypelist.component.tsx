import { Container } from "react-bootstrap";
import GameType from "./types/gameType";

type GameTypeListProps = {
    gameTypeList: Array<GameType>;
};

function GameTypeList({ gameTypeList }: GameTypeListProps) {
    return (
        <div>
            <Container>
                <h2 className="text-center text-primary">GAMETYPES</h2>
            </Container>
            <div>
                <ul>
                    {gameTypeList.map((gameType, index) => (
                        <li key={index}>
                            <span>{gameType.sportsName} </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GameTypeList;
