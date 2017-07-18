import React from "react";
import { connect } from "react-redux";

import Creator from "./Creator";
import CreatorList from "./CreatorList";
import StyledCharacterDetails from "../user_interface/StyledCharacterDetails";
import apiClient from "../lib/api-client";
import { getComicDetails } from "./selectors";
import { addToFavourites, deleteFromFavourites } from "./actions";
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
  render() {
    return (
      <div>
        <StyledCharacterDetails>
          <div>
            <div className="row">
              <div className="col-md-6">
                <img
                  src={`${this.props.comic.thumbnail
                    .path}/standard_amazing.jpg`}
                />
              </div>
              <div className="col-md-6">
                <h1>
                  {this.props.comic.title}
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
    // zbedny komentarz
    // userComicsCollection: state.comics.userComicsCollection,
    comic: getComicDetails(state, state.comics.comicsToShow.id),
    session: state.session
  };
};

export default connect(mapStateToProps)(ComicDetails);
