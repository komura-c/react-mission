import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Switch>
        <Route path="/" exact>
        </Route>
        <Route path="/signup" exact>
        </Route>
        <Route path="/login" exact>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
