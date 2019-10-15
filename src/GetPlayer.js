import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import {history} from "./store";

class GetPlayer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            player1: '',
            player2: '',
        }
    }
    handleChange = ({ target }) => {
        this.setState({ [target.id]: target.value });
    };
    renderGame() {
        console.log(history.location)
        history.push('/home', { some: 'state' });
        if(this.state.player1 === '' || this.state.player2 === ''){
            alert("Please fill the players name");
            return;
        }
        ReactDOM.render(
            <Game player1={this.state.player1} player2={this.state.player2} />,
            document.getElementById('root')
        );
    }
    render(){
        return (
            <div className="player">
                <label>Player 1</label><input id="player1" type="text" value={this.state.player1} onChange={this.handleChange}></input>
                <label>Player 2</label><input id="player2" type="text" value={this.state.player2} onChange={this.handleChange}></input>
                <button onClick={() => this.renderGame()}>Continue</button>
            </div>
        );
    }
}
export default GetPlayer