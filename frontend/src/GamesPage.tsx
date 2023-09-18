import { Component, ChangeEvent } from "react";
import GamesService from "./services/GamesService";
import Game from "./types/game";

type Props = {};

type State = {
  games: Array<Game>;
  currentGame: Game | null;
  currentIndex: number;
  gameId: any;
  location: string;
  gameDateTime: string;
  submitted: boolean;
};

export default class GamesPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.retrieveGames = this.retrieveGames.bind(this);

    this.state = {
      gameId: "",
      games: [],
      currentGame: null,
      currentIndex: -1,
      location: "",
      gameDateTime: "",
      submitted: false,
    };
  }

  componentDidMount() {
    this.retrieveGames();
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

  saveGame() {
    const data: Game = {
      gameType: "FOOTBALL",
      location: this.state.location,
      gameDateTime: this.state.gameDateTime,
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
          submitted: true,
        });
        console.log(response.data);
        this.retrieveGames();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { games, location, gameDateTime } = this.state;

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

          <button onClick={this.saveGame}>Submit</button>
        </div>
      </div>
    );
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
}
