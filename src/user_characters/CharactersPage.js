import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import md5 from "react-native-md5";

import CharacterList from "../dashboard/CharacterList";
import StyledDashboard from "../user_interface/StyledDashboard";
import apiClient from "../lib/api-client";
class CharactersPage extends React.Component {
  fetchUserCharacters() {
    apiClient
      .get("/marvel/api/v1/fetch_characters")
      .then(response => {
        console.log(response);

        this.props.dispatch({
          type: "FETCH_USER_CHAR",
          payload: response
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  show = id => {
    this.props.dispatch({ type: "SHOW", id: id });
    this.props.router.push("/character-details/" + id);
  };

  componentDidMount() {
    this.fetchUserCharacters();

    console.log("comp did mount");
  }

  render() {
    const charactersToRender = this.props.characters.userCharactersCollection;
    return (
      <div>
        <StyledDashboard>
          <CharacterList show={this.show} characters={charactersToRender} />
        </StyledDashboard>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    characters: state.characters
  };
};

export default connect(mapStateToProps)(CharactersPage);
