import React from 'react';
import './App.css';
import BarraNavegacao from './Componentes/BarraNavegacao';
import Footer from './Componentes/Footer';
import Home from './Componentes/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListaContato from './Componentes/ListaContato';
import CreateUpdateContato from './Componentes/CreateUpdateContato';

function App() {
  return (
    <div className="App">
      <Router>
        
        <BarraNavegacao/>
        
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/contatos" component={ListaContato}></Route>
          <Route path="/agenda/:id" component={CreateUpdateContato}></Route>
        </Switch>
        
        <Footer/>      

      </Router>    
    </div>
  );
}

export default App;
