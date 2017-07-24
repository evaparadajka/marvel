import React from "react";
import { connect } from "react-redux";
import apiMarvelId from "../lib/api-marvel-id";
import CharacterList from "../dashboard/CharacterList";
import { getFavouriteCharacters } from "../character_details/selectors";
import { fetchFavouriteCharacters } from "../character_details/actions";
import PageTitle from "../user_interface/PageTitle";

class CharactersPage extends React.Component {
  show = id => {
    this.props.router.push("/character-details/" + id);
  };

  fetchFromFavCharacters = () => {
    this.props.dispatch(fetchFavouriteCharacters());
  };

  componentDidMount() {
    this.fetchFromFavCharacters();
  }

  fetchCharacter = (element, index) => {
    if (typeof element.needCharacterID !== "undefined") {
      apiMarvelId
        .get(`${element.needCharacterID}`)
        .then(response => {
          this.props.dispatch({
            type: "FETCH_ONE_USER_CHAR",
            payload: response.data.data.results[0]
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  fetchMissingCharacters() {
    this.props.characters.forEach(this.fetchCharacter);
  }

  render() {
    this.fetchMissingCharacters();
    return (
      <div className="img-container">
        <PageTitle title="YOUR FAVOURITES MARVEL'S CHARACTERS" />
        <CharacterList show={this.show} characters={this.props.characters} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    characters: getFavouriteCharacters(state)
  };
};

export default connect(mapStateToProps)(CharactersPage);
