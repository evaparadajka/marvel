import React from "react";
import Button from "../user_interface/Button";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";
import { withRouter } from "react-router";

class ComicCharacter extends React.Component {
  show = id => {
    this.props.dispatch({ type: "SHOW", id: parseFloat(id) });
    this.props.router.push("/character-details/" + id);
  };

  getID = () => {
    this.show(
      this.props.resourceURI.slice(
        this.props.resourceURI.length - 7,
        this.props.resourceURI.length
      )
    );
  };

  findThumbnail = () => {
    if (
      typeof this.props.thumbnails.find(
        p =>
          p.id ===
          parseFloat(
            this.props.resourceURI.slice(
              this.props.resourceURI.length - 7,
              this.props.resourceURI.length
            )
          )
      ) !== "undefined"
    ) {
      return (
        <img
          src={
            this.props.thumbnails.find(
              p =>
                p.id ===
                parseFloat(
                  this.props.resourceURI.slice(
                    this.props.resourceURI.length - 7,
                    this.props.resourceURI.length
                  )
                )
            ).thumbnail
          }
        />
      );
    } else {
      console.log("sorry nie mam");
    }
  };

  render() {
    return (
      <div>
        {this.findThumbnail()}
        <li onClick={this.getID} className="">
          {this.props.name}
        </li>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    thumbnails: state.characters.thumbnailsToShow
  };
};

export default connect(mapStateToProps)(withRouter(ComicCharacter));
