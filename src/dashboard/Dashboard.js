import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import md5 from "react-native-md5";

import CharacterList from "./CharacterList";
import StyledDashboard from "../user_interface/StyledDashboard";

class Dashboard extends React.Component {
  fetchCharacters() {
    axios
      .get(
        "http://gateway.marvel.com/v1/public/characters?apikey=93e03380bbb458e68945c50bdd245b08",
        {
          Headers: {
            Accept: "*/*"
          }
        }
      )

      .then(response => {
        this.props.dispatch({
          type: "FETCH_CHAR",
          payload: response.data.data.results
        });
      })
      .catch(error => console.log(error));
  }

  show = id => {
    this.props.dispatch({ type: "SHOW", id: id });
    this.props.router.push("/character-details/" + id);
  };

  componentDidMount() {
    if (this.props.characters.charactersCollection.length === 0) {
      this.fetchCharacters();
    }
  }

  render() {
    const charactersToRender = this.props.characters.charactersCollection;
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

export default connect(mapStateToProps)(Dashboard);
