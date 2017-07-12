import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import md5 from "react-native-md5";

import CharacterList from "./CharacterList";
import StyledDashboard from "../user_interface/StyledDashboard";

class CharacterPage extends React.Component {
  fetchCharacters(ts) {
    axios
      .get(
        "http://gateway.marvel.com/v1/public/characters?apikey=93e03380bbb458e68945c50bdd245b08",
        {
          Headers: {
            Accept: "*/*"
          }
        }
      )
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.fetchCharacters(new Date().toString());
  }

  render() {
    const charactersToRender = this.props.characters.charactersCollection;

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

export default connect(mapStateToProps)(CharacterPage);
