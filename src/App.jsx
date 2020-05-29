import React from "react";
import { Dashboard } from "./components/pages/Dashboard";
import "./App.css";
//import { useContext } from "react";
//demonstracje korepetytora zasady działania mechanizmu Context.Provider

function App() {
  //const [state, setState] = React.useState();
  //useContext(Context);
  return (
    //<Context.Provider value={{ state, setState }}>
    <Dashboard />
    //</Context.Provider>
  );
}

export default App;
