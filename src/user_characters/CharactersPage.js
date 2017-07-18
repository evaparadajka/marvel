import React from "react";
import { connect } from "react-redux";
import CharacterList from "../dashboard/CharacterList";
import StyledDashboard from "../user_interface/StyledDashboard";
import apiClient from "../lib/api-client";
import { getFavouriteCharacters } from "../character_details/selectors";
import { fetchFavouriteCharacters } from "../character_details/actions";
// linijka przerwy pomiedzy klasa a importami
class CharactersPage extends React.Component {
  show = id => {
    // id bohatera powinno byc wziete z url a nie store
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
    console.log(this.props.characters);
    return (
      <div>
        <StyledDashboard className="img-container">
          <CharacterList show={this.show} characters={this.props.characters} />
        </StyledDashboard>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log
  console.log(state);
  return {
    characters: getFavouriteCharacters(state)
  };
};

export default connect(mapStateToProps)(CharactersPage);
