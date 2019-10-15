import React from 'react';
import Board from './Board';
class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            player1: props.player1,
            player2: props.player2,
        }
    }
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board player1={this.state.player1} player2={this.state.player2}/>
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
}
export default Game;