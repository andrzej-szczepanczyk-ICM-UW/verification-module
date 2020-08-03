import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Dashboard } from "./components/pages/Dashboard";
import { ValidateDatabase } from "./components/pages/ValidateDatabase";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/database" component={ValidateDatabase} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
