import { createStore, combineReducers, compose, applyMiddleware } from "redux";

import characters from "./dashboard/characters_reducer";

const rootReducer = combineReducers({
  characters: characters
});

const store = createStore(rootReducer);
export default store;
