import { Component, ChangeEvent } from "react";
import Game from "./types/game";
import GameType from "./types/gameType";
import GameTypes from "./gamestypelist.component copy";
import axios from "axios";
import GamesList from "./gameslist.component";

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
  isCreatingNewGame: boolean;
  isEditingGame: boolean;
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
      isCreatingNewGame: false,
      isEditingGame: false,
    };
  }

  componentDidMount() {
    this.retrieveGames();
    this.retrieveGameTypes();
  }

  toggleCreateFields() {
    this.setState({
      isCreatingNewGame: !this.state.isCreatingNewGame,
      isEditingGame: false,
      currentGame: null,
    });
  }

  toggleEditFields() {
    this.setState({
      isEditingGame: !this.state.isEditingGame,
      isCreatingNewGame: false,
    });
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
    const { gameTypes, games, location, gameDateTime, currentGame, isCreatingNewGame, isEditingGame, } = this.state;

    return (
      <div>
        <h2>GAMES</h2>
        <button onClick={() => this.toggleCreateFields()}>Create New Game</button>
        <GamesList gamesList={games} retrieveGames={this.retrieveGames} />
        {isCreatingNewGame && ( // Render create fields if isCreatingNewGame is true
          <div>
            <h3>Create New Game</h3>
            <div>
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
                <button onClick={() => this.saveGame()}>Create</button>
              </div>
            </div>
          </div>
        )}

        <div>
          {currentGame && isEditingGame && (
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

        <GameTypes gameTypeList={this.state.gameTypes} />
      </div>
    );
  }
}

