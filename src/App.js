import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Home from "./Home";
import Layout from "./Layout";

import SignIn from "./session/SignIn";
import SignUp from "./session/SignUp";
import CharacterPage from "./dashboard/CharacterPage";
class App extends Component {
  authenticateUser = (nextState, replace) => {
    const state = this.props.store.getState();
    if (!state.session.token) {
      replace({
        pathname: "sign-in"
      });
    }
  };
  render() {
    return (
      <div className="App">
        <Router history={hashHistory}>
          <Route path="/" component={Layout} onEnter={this.authenticateUser}>
            <IndexRoute path="home" component={CharacterPage} />
            {/* <Route path="characters" component={CharacterPage} /> */}
            {/* <Route path="comics" component={Comics} /> */}
          </Route>
          <Route path="sign-in" component={SignIn} />
          <Route path="sign-up" component={SignUp} />
        </Router>
      </div>
    );
  }
}

export default App;
