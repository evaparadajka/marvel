import React, { Component } from "react";

import logo from "./logo.svg";
import "./App.css";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Home from "./Home";
import Layout from "./Layout";

import SignIn from "./session/SignIn";
import SignUp from "./session/SignUp";
import Dashboard from "./dashboard/Dashboard";
import CharacterDetails from "./character_details/CharacterDetails";
import CharactersPage from "./user_characters/CharactersPage";

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
            <IndexRoute component={Dashboard} />

            <Route path="character-details/:id" component={CharacterDetails} />
            <Route path="characters" component={CharactersPage} />
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
