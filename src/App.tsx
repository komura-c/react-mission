import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./Components/Header";
import { Top } from "./Pages/Top";
import { SignUp } from "./Pages/SignUp";
import { Login } from "./Pages/Login";

export const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <div className="pt-6 p-2 text-center">
          <Routes />
        </div>
      </div>
    </Router>
  );
}

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Top />
      </Route>
      <Route path="/signup" exact>
        <SignUp />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
    </Switch>
  )
}
