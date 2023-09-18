import { Component } from "react";
import GamesService from "../services/GamesService";
import Game from "../types/game";

type Props = {};
type State = {
  games: Array<Game>;
  currentGame: Game | null;
  currentIndex: number;
};

export default class GamesList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.retrieveGames = this.retrieveGames.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.removeAllGames = this.removeAllGames.bind(this);

    this.state = {
      games: [],
      currentGame: null,
      currentIndex: -1,
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

  refreshList() {
    this.retrieveGames();
    this.setState({
      currentGame: null,
      currentIndex: -1,
    });
  }

  removeAllGames() {
    GamesService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { games } = this.state;
    return (
      <div>
        <h3>Games List</h3>
        <ul>
          {games &&
            games.map((game, index) => (
              <li key={index}>
                <span>
                  {game.gameId} ,{game.location} , {game.gameDateTime}
                </span>
                <button onClick={() => console.log(game.gameId)}>Delete</button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
