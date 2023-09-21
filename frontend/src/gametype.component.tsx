import GameType from "./types/gameType";

type GameTypeListProps = {
    gameTypeList: Array<GameType>;
};

function GameTypeList({ gameTypeList }: GameTypeListProps) {
    return (
        <div>
            <h2>GAMETYPES</h2>
            <div>
                <h3>Game Types List</h3>
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
