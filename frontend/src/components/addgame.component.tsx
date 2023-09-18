import { Component, ChangeEvent } from "react";
import GamesService from "../services/GamesService";
import Game from "../types/game";

type Props = {};

type State = Game & {
  submitted: boolean;
};

export default class AddGame extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.saveGame = this.saveGame.bind(this);

    this.state = {
      gameId: null,
      location: "",
      gameDateTime: "",
      gameType: "",
      participants: [],
      submitted: false,
    };
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
      location: "Algueirão - Mem Martins",
      gameDateTime: "2024-08-25T15:00:00",
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
          gameId: response.data.id,
          location: response.data.location,
          gameDateTime: response.data.gameDateTime,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { location, gameDateTime } = this.state;

    return (
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
            type="text"
            id="gameDateTime"
            required
            value={gameDateTime}
            onChange={this.onChangeDate}
            name="gameDateTime"
          />
        </div>
        <button onClick={this.saveGame}>Submit</button>
      </div>
    );
  }
}
