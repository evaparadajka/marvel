import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import session from "./session/session-reducer";
import persistState from "redux-localstorage";
import characters from "./dashboard/characters_reducer";
import comics from "./comics/comics-reducer";
import { reducer as notifications } from "react-notification-system-redux";
import paginationCharacters from "./dashboard/pagination-reducer";
import paginationComics from "./comics/pagination-reducer";

const rootReducer = combineReducers({
  characters: characters,
  session: session,
  comics: comics,
  notifications,
  paginationCharacters: paginationCharacters,
  paginationComics: paginationComics
});

const enhancer = compose(
  applyMiddleware(thunk),
  persistState([
    "session",
    "characters",
    "comics",
    "paginationCharacters",
    "paginationComics"
  ])
);

const store = createStore(rootReducer, {}, enhancer);

export default store;
