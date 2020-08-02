import { createStore, combineReducers, applyMiddleware } from "redux";
import { UmImgwPair } from "./reducers/UmImgwPair";
import { persistStore, persistReducer } from "redux-persist";
import { config } from "./persist";
import { createLogger } from "redux-logger";

const rootReducer = combineReducers({
  UmImgwPair,
});

const logger = createLogger({});

const persistedReducer = () => persistReducer(config, rootReducer);

export const store = createStore(
  process.env.NODE_ENV === "development" ? persistedReducer() : rootReducer,
  applyMiddleware(logger)
);

export const persistor =
  process.env.NODE_ENV === "development" ? persistStore(store) : null;
