import React, { Component } from "react";
import "./App.css";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Layout from "./Layout";
import Notifications from "react-notify-toast";
import SignIn from "./session/SignIn";
import SignUp from "./session/SignUp";
import Dashboard from "./dashboard/Dashboard";
import ComicsDashboard from "./comics/ComicsDashboard";
import CharacterDetails from "./character_details/CharacterDetails";
import CharactersPage from "./user_characters/CharactersPage";
import ComicsDetails from "./comic-details/ComicsDetails";
import ComicsPage from "./user_comics/ComicsPage";

import NotificationComponent from "./alert/NotificationComponent";
import NotFound from "./NotFound";

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
        {/* <Notifications options={{ zIndex: 5000 }} /> */}
        <NotificationComponent />
        <Router history={hashHistory}>
          <Route path="/" component={Layout} onEnter={this.authenticateUser}>
            <IndexRoute component={Dashboard} />
            <Route path="dashboard/:page" component={Dashboard} />
            <Route path="character-details/:id" component={CharacterDetails} />
            <Route path="not-found" component={NotFound} />
            <Route path="fav-characters" component={CharactersPage} />
            <Route path="comics/:page" component={ComicsDashboard} />
            <Route path="comic-details/:id" component={ComicsDetails} />
            {<Route path="fav-comics" component={ComicsPage} />}
          </Route>
          <Route path="sign-in" component={SignIn} />
          <Route path="sign-up" component={SignUp} />
        </Router>
      </div>
    );
  }
}

export default App;
