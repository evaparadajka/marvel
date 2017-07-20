import React from "react";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";
import Button from "../user_interface/Button";
import apiClient from "../lib/api-client";
import CharacterList from "./CharacterList";
import { fetchFavouriteCharacters } from "../character_details/actions";
import { appendFavourites } from "../character_details/selectors";
// import { InfiniteScroll } from "react-infinite-scroller";
// import ReactDOM from "react-dom";

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

  loadMore = () => {
    console.log("loadMore");
  };

  show = id => {
    this.props.dispatch({ type: "SHOW", id: id });
    this.props.router.push("/character-details/" + id);
  };


  clickNewChar = e => {
    e.preventDefault();
    const charactersAmount = this.props.characters.length;
    this.fetchCharacters(charactersAmount);
  };

  render() {
    const charactersToRender = this.props.characters;

    return (
      <div className="center">

        <div className="img-container">


          <CharacterList show={this.show} characters={charactersToRender} />
        </div>
        <br />
        <Button
          className="btn-danger"
          onClick={this.clickNewChar}
          label="Load more..."
        />
        <div className="infinitive-scroll" onMouseEnter={this.loadMore}>
          Loading more ...
        </div>
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    characters: appendFavourites(state)
  };
};

export default connect(mapStateToProps)(Dashboard);
