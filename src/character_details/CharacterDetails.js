import React from "react";
import { connect } from "react-redux";

import ComicList from "./ComicList";
import StoryList from "./StoryList";
import StyledCharacterDetails from "../user_interface/StyledCharacterDetails";
import apiClient from "../lib/api-client";
import { getCharDetails } from "./selectors";
import { addToFavourites, deleteFromFavourites } from "./actions";

import { showNotification } from "../lib/functions";
class CharacterDetails extends React.Component {
  addToFav = () => {
    this.props.dispatch(addToFavourites(this.props.character));
    showNotification("Character added!");
  };
  delFromFav = () => {
    this.props.dispatch(deleteFromFavourites(this.props.character));
    showNotification("Character deleted!");
  };
  isCharInFavs = () => {
    return this.props.character.isFavourite;
  };
  renderActionButton = () => {
    if (this.isCharInFavs()) {
      return (
        <div className="col-md-6">
          <button
            onClick={this.delFromFav}
            className="fa fa-trash-o fa-3x nav-style"
          />
        </div>
      );
    } else {
      return (
        <div className="col-md-6">
          <button
            onClick={this.addToFav}
            className="fa fa-plus fa-3x nav-style"
          />
        </div>
      );
    }
  };

  // showNotification = message => {
  //   let navStyleColor = {
  //     background: "#c94c4c",
  //     text: "white"
  //   };
  //   notify.show(message, "custom", 5000, navStyleColor);
  // };

  render() {
    return (
      <div>
        <StyledCharacterDetails>
          <div>
            <div className="row">
              <div className="col-md-6">
                <img
                  src={`${this.props.character.thumbnail
                    .path}/standard_amazing.jpg`}
                />
              </div>
              <div className="col-md-6">
                <h1>
                  {this.props.character.name}
                </h1>
              </div>

              {this.renderActionButton()}
            </div>
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
}

const mapStateToProps = state => {
  return {
    character: getCharDetails(state, state.characters.characterToShow.id),
    session: state.session
  };
};

export default connect(mapStateToProps)(CharacterDetails);
