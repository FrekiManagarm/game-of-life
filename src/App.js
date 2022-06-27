
import React, { Component } from 'react';
import './App.css';
import Game from './GameOfLife';

class App extends Component {

    render() {

        return (
            <div className="App">
                <h1>Le Jeu de la Vie selon J. H. Conway</h1>
                <Game />
            </div>
        );
    }
}

export default App;
