import React from "react";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";

//import InfiniteScroll from "react-infinite-scroll";
import Button from "../user_interface/Button";
import apiClient from "../lib/api-client";
import CharacterList from "./CharacterList";
import StyledDashboard from "../user_interface/StyledDashboard";
import { fetchFavouriteCharacters } from "../character_details/actions";
import { appendFavourites } from "../character_details/selectors";
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
    //this.fetchCharacters(this.props.characters.charactersCollection.length);
  }

  clickNewChar = e => {
    e.preventDefault();
    const charactersAmount = this.props.characters.length;
    this.fetchCharacters(charactersAmount);
    console.log("klik");
  };

  render() {
    const charactersToRender = this.props.characters;

    return (
      <div className="center">
        <StyledDashboard className="img-container">
          <CharacterList show={this.show} characters={charactersToRender} />
        </StyledDashboard>
        <br />
        <Button onClick={this.clickNewChar} label="get new Characters" />
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    characters: appendFavourites(state)
    // favCharacters: getFavouriteCharacters(state)
  };
};

export default connect(mapStateToProps)(Dashboard);
