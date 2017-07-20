import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import session from "./session/session-reducer";
import persistState from "redux-localstorage";
import characters from "./dashboard/characters_reducer";
import comics from "./comics/comics-reducer";

const rootReducer = combineReducers({
  characters: characters,
  session: session,
  comics: comics
});
const enhancer = compose(
  applyMiddleware(thunk),
  persistState(["session", "characters", "comics"])
);
const store = createStore(rootReducer, {}, enhancer);

export default store;
