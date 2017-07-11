import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { counter, posts } from "./posts/postsReducer";
import session from "./session/sessionReducer";
import persistState from "redux-localstorage";
//polaczone reducery
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  // posts: posts,
  counter: counter,
  session: session
});
const enhancer = compose(applyMiddleware(thunk), persistState("session"));
const store = createStore(rootReducer, {}, enhancer);

export default store;
