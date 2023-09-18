import { Component, ChangeEvent } from "react";
import GamesService from "./services/GamesService";
import GameTypesService from "./services/GameTypesService";
import Game from "./types/game";
import GameType from "./types/gameType";

type Props = {};

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
    GamesService.getAll()
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
    GameTypesService.getAll()
      .then((response: any) => {
        // Assuming response.data is ["FOOTBALL", "PADEL"]
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
    GamesService.delete(gameId)
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

    GamesService.create(data)
      .then((response: any) => {
        this.setState({
          gameId: response.data.gameId,
          location: "",
          gameDateTime: "",
        });
        console.log(response.data);
        this.retrieveGames();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { gameTypes, games, location, gameDateTime } = this.state;

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
                    {game.gameId} ,{game.location} , {game.gameDateTime}
                  </span>
                  <button onClick={() => this.deleteGame(game.gameId)}>
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              required
              value={location}
              onChange={this.onChangeLocation}
              name="location"
            />
          </div>
          <div>
            <label htmlFor="gameDateTime">Game DateTime</label>
            <input
              type="datetime-local"
              id="gameDateTime"
              required
              value={gameDateTime}
              onChange={this.onChangeDate}
              name="gameDateTime"
            />
          </div>
          <div>
            <label htmlFor="gameType">Game Type</label>
            <select
              id="gameType"
              value={this.state.selectedGameType}
              onChange={(e) =>
                this.setState({ selectedGameType: e.target.value })
              }
            >
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
