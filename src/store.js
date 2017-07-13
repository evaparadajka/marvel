import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import session from "./session/sessionReducer";
import persistState from "redux-localstorage";
import characters from "./dashboard/characters_reducer";

const rootReducer = combineReducers({
  characters: characters,
  session: session
});
const enhancer = compose(
  applyMiddleware(thunk),
  persistState(["session", "characters"])
);
const store = createStore(rootReducer, {}, enhancer);

export default store;
