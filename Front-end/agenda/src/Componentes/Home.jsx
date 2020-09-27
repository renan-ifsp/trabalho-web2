import logo from '../logo.svg';
import React, { Component } from 'react';


class Home extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <h1>Bem Vindo a Agenda de Contatos</h1>
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
            </div>
        );
    }
}

export default Home;