import React from "react";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";
import Button from "../user_interface/Button";
import CharacterList from "./CharacterList";
import { appendFavourites } from "../character_details/selectors";
import PropTypes from "prop-types";
import Notifications, { success } from "react-notification-system-redux";
import { notificationLoadCharacters } from "../alert/notifications";

class Dashboard extends React.Component {
  showNotification = message => {
    this.context.store.dispatch(message);
  };

  fetchCharacters(offset) {
    apiMarvel
      .get("/characters", {
        params: {
          offset: offset
        }
      })
      .then(response => {
        this.props.dispatch({
          type: "FETCH_CHAR",
          payload: response.data.data.results
        });
      })
      .catch(error => console.log(error));
  }

  show = id => {
    this.props.router.push("/character-details/" + id);
  };

  clickNewChar = e => {
    e.preventDefault();
    this.showNotification(success(notificationLoadCharacters));

    this.fetchCharacters(this.props.charactersToSkip);
  };

  render() {
    const charactersToRender = this.props.characters;

    return (
      <div className="center">
        <div className="img-container">
          <CharacterList show={this.show} characters={charactersToRender} />
          {/* <div className="infinitive-scroll" onMouseMove={this.clickNewChar} /> */}
        </div>
        <br />
        <Button
          onClick={this.clickNewChar}
          className="btn-danger"
          label="Load more..."
        />

        <br />
        <br />
      </div>
    );
  }
}
Dashboard.contextTypes = {
  store: PropTypes.object
};
const mapStateToProps = state => {
  return {
    characters: appendFavourites(state),
    charactersToSkip: state.characters.weHaveFetched
  };
};

export default connect(mapStateToProps)(Dashboard);
