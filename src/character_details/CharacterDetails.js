import React from "react";
import { connect } from "react-redux";
import ComicList from "./ComicList";
import StoryList from "./StoryList";
import StyledCharacterDetails from "../user_interface/StyledCharacterDetails";
import StyledCharacterBase from "../user_interface/StyledCharacterBase";
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
        <div>
          <i
            onClick={this.delFromFav}
            className="fa fa-trash-o fa-3x nav-style"
          />
        </div>
      );
    } else {
      return (
        <div>
          <i onClick={this.addToFav} className="fa fa-plus fa-3x nav-style" />
        </div>
      );
    }
  };

  renderDescription = () => {
    if (this.props.character.description === "") {
      return (
        <div>
          Character description is not yet provided. Thank you for your
          patience.
        </div>
      );
    } else
      return (
        <div>
          {this.props.character.description}
        </div>
      );
  };

  render() {
    return (
      <div className="img-container">
        <StyledCharacterBase>
          <div>
            <div>
              <img
                className="img-responsive"
                src={`${this.props.character.thumbnail
                  .path}/landscape_incredible.jpg`}
              />
            </div>
            <div>
              <h1>
                {this.props.character.name}
              </h1>
            </div>

            {this.renderActionButton()}
          </div>
        </StyledCharacterBase>
        <hr />
        <h3>DETAILS</h3>
        <StyledCharacterDetails>
          <div>
            <h4>Description:</h4>
            {this.renderDescription()}
          </div>

          <div>
            <h4>Comics:</h4>

            <ComicList comics={this.props.character.comics.items} />
          </div>

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
