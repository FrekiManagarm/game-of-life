
import React, { Component } from 'react';
import './App.css';
import Game from './GameOfLife';

class App extends Component {

    render() {

        return (
            <div className="App">
                <h1>Le Jeu de la Vie selon J. H. Conway</h1>
                <p>Pour retrouver le principe du Jeu de la Vie de Conway</p>
                <a style={{
                    marginBottom: '10px'
                }} target='_blank' href='https://fr.wikipedia.org/wiki/Jeu_de_la_vie'>Cliquer Ici</a>
                <Game />
            </div>
        );
    }
}

export default App;
