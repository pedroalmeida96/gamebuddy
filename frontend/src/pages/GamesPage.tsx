import GamesList from "../components/gamelist.component";
import AddGame from "../components/addgame.component";

function GamesPage() {
  return (
    <div>
      <h2>GAMES</h2>
      <div>
        <GamesList />
      </div>
      <div>
        <AddGame />
      </div>
    </div>
  );
}

export default GamesPage;
