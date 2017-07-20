import React from "react";
import { connect } from "react-redux";
import CharacterList from "../dashboard/CharacterList";
import apiClient from "../lib/api-client";
import { getFavouriteCharacters } from "../character_details/selectors";
import { fetchFavouriteCharacters } from "../character_details/actions";

class CharactersPage extends React.Component {
  show = id => {
    this.props.dispatch({ type: "SHOW", id: id });
    this.props.router.push("/character-details/" + id);
  };

  fetchFromFavCharacters = () => {
    this.props.dispatch(fetchFavouriteCharacters());
  };

  componentDidMount() {
    this.fetchFromFavCharacters();
  }

  render() {
    return (
      <div className="img-container">
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
