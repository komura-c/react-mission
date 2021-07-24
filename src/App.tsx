import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { SessionProvider } from "./Context/SessionContext";
import { UserProvider } from "./Context/UserContext";
import { LoadingProvider } from "./Context/LoadingContext";

import { Header } from "./Components/Header";

import { Top } from "./Pages/Top";
import { SignUp } from "./Pages/SignUp";
import { Login } from "./Pages/Login";

export const App = () => {
  return (
    <Router>
      <LoadingProvider>
        <SessionProvider>
          <UserProvider>
            <Header />
            <div className="pt-6 p-2 text-center">
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
            </div>
          </UserProvider>
        </SessionProvider>
      </LoadingProvider>
    </Router>
  );
}
