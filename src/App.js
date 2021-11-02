import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Login from "./pages/Login/Login";
import { Switch, Route } from "react-router-dom";
import Registrar from "./pages/Login/Registrar";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/registrar">
          <Registrar />
        </Route>
        <Route path="/main">
          <MainMenu />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
