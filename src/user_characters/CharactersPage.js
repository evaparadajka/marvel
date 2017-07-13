import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import md5 from "react-native-md5";

import CharacterList from "../dashboard/CharacterList";
import StyledDashboard from "../user_interface/StyledDashboard";
import apiClient from "../lib/api-client";
class CharactersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favCharacters: []
    };
  }
  fetchUserCharacters() {
    const characterArr = [];
    apiClient
      .get("/marvel/api/v1/fetch_characters")
      .then(response => {
        // console.log(response.data.characters);
        const charactersIdToRender = response.data.characters.map(
          c => c.external_id
        );

        charactersIdToRender.forEach(charId => {
          this.props.characters.charactersCollection.map(c => {
            if (c.id === charId) {
              characterArr.push(c);
            }
          });
        });
        this.props.dispatch({
          type: "FETCH_USER_CHAR",
          payload: characterArr
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchCharacter(charId) {
    // if (this.props.characters.userCharactersCollection) {
    //   console.log(
    //     `https://gateway.marvel.com:443/v1/public/characters/${charId}?apikey=93e03380bbb458e68945c50bdd245b08`
    //   );
    // }
  }

  show = id => {
    this.props.dispatch({ type: "SHOW", id: id });
    this.props.router.push("/character-details/" + id);
  };

  componentDidMount() {
    var favs = this.fetchUserCharacters();
    console.log(favs);
    this.setState({
      favCharacters: favs
    });
  }

  render() {
    const charactersToRender = this.props.characters.userCharactersCollection;
    console.log("Ulubione postacie ", charactersToRender);
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
