import React from "react";
import { connect } from "react-redux";
import axios from "axios";

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

  componentDidMount() {
    this.fetchCharacters();
  }

  render() {
    const charactersToRender = this.props.characters.charactersCollection;
    console.log(this.props.characters);

    return (
      <div>
        <StyledDashboard>
          <CharacterList characters={charactersToRender} />
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
