import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <Switch>
          <Route path="/" exact>
            <div>home</div>
          </Route>
          <Route path="/signup" exact>
            <div>signup</div>
          </Route>
          <Route path="/login" exact>
            <div>login</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
