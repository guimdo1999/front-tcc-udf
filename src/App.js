import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Switch, Route } from "react-router-dom";
import Registrar from "./pages/Login/Registrar";
import MainMenu from "./components/MainMenu";
import NotAdminMenu from "./components/NotAdminMenu";
import ManagerMenu from "./components/ManagerMenu";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Escola!";
  }, []);
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
        <Route path="/home">
          <NotAdminMenu />
        </Route>
        <Route path="/gerente">
          <ManagerMenu />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
