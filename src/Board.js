import React from 'react';
import Square from './Square';
import GetPlayer from './GetPlayer';
import ReactDOM from 'react-dom';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            clickClass: Array(9).fill('square'),
            disabled: Array(9).fill(false),
            xIsNext: true,
        }
    }
    handleClick(i){
        const squares = this.state.squares.slice();
        if(calculateWinner(squares)){
            return;
        }
        if(this.state.disabled[i]){
            alert("You can't click on this column, becuase it's already cliked by your opposit person")
            return;
        }
        const clickClass = this.state.clickClass.slice();
        const disabled = this.state.disabled.slice();
        squares[i] = this.state.xIsNext?'X':'O';
        clickClass[i] = this.state.xIsNext?'square xclicked':'square oclicked';
        disabled[i] = true;
        this.setState({squares: squares, clickClass: clickClass, xIsNext: !this.state.xIsNext, disabled: disabled});
    }
    renderSquare(i) {
        return <Square value={this.state.squares[i]} class={this.state.clickClass[i]} onClick={() => this.handleClick(i)} disabled={this.state.disabled[i]}/>;
    }
    renderAgain(){
        this.setState(state => ({
            squares: Array(9).fill(null),
            clickClass: Array(9).fill('square'),
            disabled: Array(9).fill(false),
            xIsNext: true,
        }));
    }
    renderClose(){
        ReactDOM.render(
            <GetPlayer />,
            document.getElementById('root')
        );
    }
    capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    render() {
        const winner = calculateWinner(this.state.squares);
        let winnerName;
        let status;
        let statusClass = 'status';
        if(winner){
            if(winner === 'X')
                winnerName = this.props.player1;
            else
                winnerName = this.props.player2;
            status = 'Congratulations the Winner is : '+ winnerName
            statusClass = statusClass+' winner';
        }
        else{
            const gameOver = checkGameOver(this.state.squares);
            if(gameOver){
                status = "Games Over";
                statusClass = statusClass+' game-over';
                return (
                    <div>
                        <div className={statusClass}>{status}</div>
                        <div className="board-row">
                            {this.renderSquare(0)}
                            {this.renderSquare(1)}
                            {this.renderSquare(2)}
                        </div>
                        <div className="board-row">
                            {this.renderSquare(3)}
                            {this.renderSquare(4)}
                            {this.renderSquare(5)}
                        </div>
                        <div className="board-row">
                            {this.renderSquare(6)}
                            {this.renderSquare(7)}
                            {this.renderSquare(8)}
                        </div>
                        <button onClick={() => this.renderAgain()}>Retry</button>
                        <button onClick={() => this.renderClose()}>Exit</button>
                    </div>
                );
            }else
                status = 'Player: '+(this.state.xIsNext?this.capitalize(this.props.player1):this.capitalize(this.props.player2));
        }
        return (
            <div>
                <div className={statusClass}>{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}
function checkGameOver(squares){
    for (let i = 0; i < squares.length; i++) {
        if(squares[i]== null){
            return false;
        }
    }
    return true;
}
export default Board;