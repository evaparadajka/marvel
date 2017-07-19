import React from "react";
import { connect } from "react-redux";

import ComicList from "./ComicList";
import StoryList from "./StoryList";
import StyledCharacterDetails from "../user_interface/StyledCharacterDetails";
import apiClient from "../lib/api-client";
import { getCharDetails } from "./selectors";
import { addToFavourites, deleteFromFavourites } from "./actions";
import apiMarvelId from "../lib/api-marvel-id";
// import {s } from "./actions";
class CharacterDetails extends React.Component {
  addToFav = () => {
    this.props.dispatch(addToFavourites(this.props.character));
  };
  delFromFav = () => {
    this.props.dispatch(deleteFromFavourites(this.props.character));
  };
  isCharInFavs = () => {
    return this.props.character.isFavourite;
  };
  renderActionButton = () => {
    if (this.isCharInFavs()) {
      return (
        <div>
          <button
            onClick={this.delFromFav}
            className="fa fa-trash-o fa-3x nav-style"
          />
        </div>
      );
    } else {
      return (
        <div>
          <button
            onClick={this.addToFav}
            className="fa fa-plus fa-3x nav-style"
          />
        </div>
      );
    }
  };

  doIHaveCharacter = id => {
    if (typeof this.props.character === "undefined") {
      apiMarvelId
        .get(id)
        .then(response => {
          this.props.dispatch({
            type: "SHOW/FETCH",
            payload: response.data.data.results[0]
          });
          //this.props.router.push("/character-details/" + id);
        })
        .catch(error => console.log(error));
    } else {
      //this.props.router.push("/character-details/" + id);
    }
  };

  doIHaveSomethingToRender = () => {
    if (typeof this.props.character === "undefined") {
      return <div />;
    } else {
      return (
        <div className="img-container">
          <StyledCharacterDetails className="center">
            <div className="space-in-details">
              <div>
                <img
                  src={`${this.props.character.thumbnail
                    .path}/standard_amazing.jpg`}
                />
              </div>
              <div>
                <div className="rectangle">
                  {this.props.character.name}
                </div>
              </div>

              {this.renderActionButton()}
            </div>
          </StyledCharacterDetails>
          <StyledCharacterDetails>
            <h3>DETAILS</h3>
            <br />
            <div>
              <h4>Description:</h4>
              {this.props.character.description}
            </div>
            <br />
            <div>
              <h4>Comics:</h4>
              <ComicList comics={this.props.character.comics.items} />
            </div>
            <br />
            <div>
              <h4>Stories:</h4>
              <StoryList stories={this.props.character.stories.items} />
            </div>
          </StyledCharacterDetails>
        </div>
      );
    }
  };

  componentDidMount() {
    this.doIHaveCharacter(
      this.props.router.location.pathname.slice(
        this.props.router.location.pathname.length - 7,
        this.props.router.location.pathname.length
      )
    );
  }

  render() {
    return (
      <div>
        {this.doIHaveSomethingToRender()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    character: state.characters.characterToShow,
    // typeof state.characters.characterToShow === "undefined"
    //   ? getCharDetails(state)
    //   : getCharDetails(state, state.characters.characterToShow.id),
    session: state.session
  };
};

export default connect(mapStateToProps)(CharacterDetails);
