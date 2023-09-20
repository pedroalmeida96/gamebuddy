import { Component, ChangeEvent } from "react";
import Game from "./types/game";
import GameType from "./types/gameType";
import axios from "axios";

type Props = {
};

type State = {
  games: Array<Game>;
  gameTypes: Array<GameType>;
  currentGame: Game | null;
  currentIndex: number;
  gameId: any;
  location: string;
  gameDateTime: string;
  selectedGameType: string;
};

export default class GamesPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.retrieveGames = this.retrieveGames.bind(this);
    this.retrieveGameTypes = this.retrieveGameTypes.bind(this);
    this.selectGame = this.selectGame.bind(this);

    this.state = {
      gameId: "",
      games: [],
      gameTypes: [],
      currentGame: null,
      currentIndex: -1,
      location: "",
      gameDateTime: "",
      selectedGameType: "",
    };
  }

  componentDidMount() {
    this.retrieveGames();
    this.retrieveGameTypes();
  }

  retrieveGames() {
    axios.get("http://localhost:8080/api/games", {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json"
      }
    })
      .then((response: any) => {
        this.setState({
          games: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  retrieveGameTypes() {
    axios.get("http://localhost:8080/api/gameTypes", {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json"
      }
    })
      .then((response: any) => {
        const gameTypes = response.data.map((sportsName: string) => ({
          sportsName,
        }));

        this.setState({
          gameTypes,
        });
        console.log("gametype", gameTypes);
      })
      .catch((e: Error) => {
        console.log("Error:", e);
      });
  }

  onChangeLocation(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      location: e.target.value,
    });
  }

  onChangeDate(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      gameDateTime: e.target.value,
    });
  }

  deleteGame(gameId: any): void {
    axios.delete("http://localhost:8080/api/games/delete/" + gameId, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json"
      }
    })
      .then(() => {
        console.log("Game deleted successfully");
        this.retrieveGames();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  saveGame() {
    const data: Game = {
      location: this.state.location,
      gameDateTime: this.state.gameDateTime,
      gameType: this.state.selectedGameType,
      participants: [
        {
          userId: "1",
          name: "Alice",
        },
      ],
    };

    axios.post("http://localhost:8080/api/games/create", data, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json"
      }
    })
      .then((response: any) => {
        this.setState({
          gameId: response.data.gameId,
          location: "",
          gameDateTime: "",
          selectedGameType: ""
        });
        console.log(response.data);
        this.retrieveGames();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  selectGame(game: Game) {
    this.setState({
      currentGame: game,
      location: game.location,
      gameDateTime: game.gameDateTime,
      selectedGameType: game.gameType,
    });
  }

  render() {
    const { gameTypes, games, location, gameDateTime, currentGame } = this.state;

    return (
      <div>
        <h2>GAMES</h2>
        <div>
          <h3>Games List</h3>
          <ul>
            {games &&
              games.map((game, index) => (
                <li key={index}>
                  <span>
                    {game.gameId}, {game.location}, {game.gameDateTime}
                  </span>
                  <button onClick={() => this.deleteGame(game.gameId)}>Delete</button>
                  <button onClick={() => this.selectGame(game)}>Edit</button>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <div>
            <label htmlFor="location">Location</label>
            <input type="text" id="location" required value={location} onChange={this.onChangeLocation} name="location" />
          </div>
          <div>
            <label htmlFor="gameDateTime">Game DateTime</label>
            <input type="datetime-local" id="gameDateTime" required value={gameDateTime} onChange={this.onChangeDate} name="gameDateTime" />
          </div>
          <div>
            <label htmlFor="gameType">Game Type</label>
            <select id="gameType" value={this.state.selectedGameType} onChange={(e) => this.setState({ selectedGameType: e.target.value })}>
              <option value="">Select a game type</option>
              {gameTypes &&
                gameTypes.map((gameType, index) => (
                  <option key={index} value={gameType.sportsName}>
                    {gameType.sportsName}
                  </option>
                ))}
            </select>
          </div>
          <button onClick={this.saveGame}>Submit</button>
        </div>
        <div>
          {currentGame && ( // Render the update fields if a game is selected
            <div>
              <h3>Edit Game</h3>
              <div>
                <label htmlFor="location">Location</label>
                <input
                  type="text" id="location" required value={location} onChange={this.onChangeLocation} name="location" />
              </div>
              <div>
                <label htmlFor="gameDateTime">Game DateTime</label>
                <input type="datetime-local" id="gameDateTime" required value={gameDateTime} onChange={this.onChangeDate} name="gameDateTime" />
              </div>
              <div>
                <label htmlFor="gameType">Game Type</label>
                <select id="gameType" value={this.state.selectedGameType} onChange={(e) => this.setState({ selectedGameType: e.target.value })} >
                  <option value="">Select a game type</option>
                  {gameTypes &&
                    gameTypes.map((gameType, index) => (
                      <option key={index} value={gameType.sportsName}>
                        {gameType.sportsName}
                      </option>
                    ))}
                </select>
              </div>
              <button onClick={this.saveGame}>Update</button>
            </div>
          )}
        </div>

        <h2>GAMETYPES</h2>
        <div>
          <h3>Game Types List</h3>
          <ul>
            {gameTypes &&
              gameTypes.map((gameType, index) => (
                <li key={index}>
                  <span>{gameType.sportsName} </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
