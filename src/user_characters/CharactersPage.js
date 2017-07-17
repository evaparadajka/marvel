import React from "react";
import { connect } from "react-redux";
import CharacterList from "../dashboard/CharacterList";
import StyledDashboard from "../user_interface/StyledDashboard";
import apiClient from "../lib/api-client";
import { getFavouriteCharacters } from "../character_details/selectors";
import { fetchFavouriteCharacters } from "../character_details/actions";
class CharactersPage extends React.Component {
  show = id => {
    this.props.dispatch({ type: "SHOW", id: id });
    this.props.router.push("/character-details/" + id);
  };

  // isCharactersDataFetched = () => {
  //   if (this.props.characters.length > 0) return true;
  //   else return false;
  // };
  //
  // renderCharacterList = () => {
  //   if (this.isCharactersDataFetched()) {
  //     console.log("Przed renderem ", this.props.characters);
  //     return (
  //
  //     );
  //   } else {
  //     return null;
  //   }
  // };
  componentDidMount() {
    // this.fetchUserCharacters;
    apiClient
      .get("/marvel/api/v1/fetch_characters")
      .then(response => {
        console.log(response);
        this.props.dispatch({
          type: "FETCH_USER_CHAR",
          payload: response.data.characters
        });
      })
      .catch(error => {
        console.log(error);
      });
    // };
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
  console.log(state);
  return {
    characters: getFavouriteCharacters(state)
  };
};

export default connect(mapStateToProps)(CharactersPage);
