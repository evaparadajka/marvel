import React from "react";
import { connect } from "react-redux";

import Creator from "./Creator";
import CreatorList from "./CreatorList";
import StyledCharacterDetails from "../user_interface/StyledCharacterDetails";
import apiClient from "../lib/api-client";
import { getComicDetails } from "./selectors";
import { addToFavourites, deleteFromFavourites } from "./actions";
// import CharacterInComic from "./CharacterInComic";
// import CharacterListInComic from "./CharacterListInComic";
// import CharactersDashboardInComic from "./CharactersDashboardInComic";
import ComicCharacter from "./ComicCharacter";
import ComicCharacterList from "./ComicCharacterList";
import { showNotification } from "../lib/functions";

class ComicDetails extends React.Component {
  addToFav = () => {
    this.props.dispatch(addToFavourites(this.props.comic));
    showNotification("Comic added!");
  };
  delFromFav = () => {
    this.props.dispatch(deleteFromFavourites(this.props.comic));
    showNotification("Comic deleted!");
  };
  isComicInFavs = () => {
    return this.props.comic.isFavourite;
  };
  renderActionButton = () => {
    if (this.isComicInFavs()) {
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

  getID = (e, i, a) => {
    console.log(
      this.props.comic.characters.items[i].resourceURI.slice(
        this.props.comic.characters.items[i].resourceURI.length - 7,
        this.props.comic.characters.items[i].resourceURI.length
      ),
      "bla"
    );
  };

  getCharIDs = (i = 0) => {
    //this.props.comic.characters.items.forEach(this.getID);
  };

  render() {
    return (
      <div className="img-container">
        <StyledCharacterDetails className="center">
          <div className="space-in-details">
            <div>
              <img
                src={`${this.props.comic.thumbnail.path}/standard_amazing.jpg`}
              />
            </div>
            <div>
              <div className="rectangle">
                {this.props.comic.title}
              </div>
            </div>

            {this.renderActionButton()}
          </div>
        </StyledCharacterDetails>

        <StyledCharacterDetails>
          <h3>CHARACTERS</h3>

          <br />
          <ComicCharacterList characters={this.props.comic.characters.items} />
        </StyledCharacterDetails>

        <StyledCharacterDetails>
          <h3>DETAILS</h3>
          <br />
          <div>
            <h4>Description:</h4>
            {this.props.comic.description}
          </div>
          <br />
          <div>
            <h4>Pages:</h4>
            {this.props.comic.pageCount}
          </div>
          <br />
          <div>
            <h4>Series:</h4>
            {this.props.comic.series.name}
          </div>
          <br />
          <div>
            <h4>Creators:</h4>
            <CreatorList creators={this.props.comic.creators.items} />
          </div>
          <br />
        </StyledCharacterDetails>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // userComicsCollection: state.comics.userComicsCollection,
    comic: getComicDetails(state, state.comics.comicsToShow.id),
    session: state.session
  };
};

export default connect(mapStateToProps)(ComicDetails);
