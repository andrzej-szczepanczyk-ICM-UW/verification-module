import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";

// const Context = React.createContext();
// const Provider = ({ store, children }) => {
//   const {
//     dispatch,
//     getState,
//     replaceReducer,
//     subscribe
//   } = store;
//   const [state, setState] = React.useState();
//   React.useEffect(() => {
//     subscribe(state => setState(state));
//   }, [])

//   return (
//     <Context.Provider value={{ dispatch, getState, replaceReducer, subscribe }} children={children} />
//   )
// }

// useSelector i useDispatch

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
