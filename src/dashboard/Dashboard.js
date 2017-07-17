import React from "react";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";
import apiClient from "../lib/api-client";
import CharacterList from "./CharacterList";
import StyledDashboard from "../user_interface/StyledDashboard";
import { fetchFavouriteCharacters } from "../character_details/actions";

class Dashboard extends React.Component {
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
    this.props.dispatch({ type: "SHOW", id: id });
    this.props.router.push("/character-details/" + id);
  };

  // isUserCharactersCollectionEmpty = () => {
  //   if ((this.props.characters.userCharactersCollection.length = 0))
  //     return true;
  //   else return false;
  // };

  componentDidMount() {
    this.fetchCharacters(this.props.characters.charactersCollection.length);
    // fetchFavouriteCharacters();
    // if (this.isUserCharactersCollectionEmpty()) {
    //   fetchFavouriteCharacters();
    // }

    // console.log("nie sciagaj");
    // fetchFavouriteCharacters();
    // apiClient
    //   .get("/marvel/api/v1/fetch_characters")
    //   .then(response => {
    //     console.log(response);
    //     this.props.dispatch({
    //       type: "FETCH_USER_CHAR",
    //       payload: response.data.characters
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // };
  }

  render() {
    const charactersToRender = this.props.characters.charactersCollection;

    return (
      <div className="center">
        <StyledDashboard className="img-container">
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
