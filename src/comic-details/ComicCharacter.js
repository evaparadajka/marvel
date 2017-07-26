import React from "react";
import Button from "../user_interface/Button";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";
import { withRouter } from "react-router";
import StyledOverlay from "../user_interface/StyledOverlay";

class ComicCharacter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      // console.log
      // actionButtonClicked: false
    };
  }

  onMouseEnterHandler = () => {
    this.setState({
      hover: true,
    });
  };
  onMouseLeaveHandler = () => {
    this.setState({
      hover: false,
    });
  };

  isHovered = () => {
    return this.state.hover;
  };

  renderOverlay = () => {
    if (this.isHovered()) {
      return (
        <StyledOverlay onClick={this.show}>
          <div className="name-small">
            {this.props.name}
          </div>
        </StyledOverlay>
      );
    } else return null;
  };

  show = event => {
    this.props.show(
      this.props.resourceURI.slice(
        this.props.resourceURI.length - 7,
        this.props.resourceURI.length
      )
    );
  };

  getID = () => {
    this.show(
      this.props.resourceURI.slice(
        this.props.resourceURI.length - 7,
        this.props.resourceURI.length
      )
    );
  };

  // za dluga funkcja
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
          alt="Image not found"
        />
      );
    } else {
    }
  };

  render() {
    return (
      <div
        className="square-small"
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}>
        {this.findThumbnail()}
        {this.renderOverlay()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    thumbnails: state.characters.thumbnailsToShow,
  };
};

export default connect(mapStateToProps)(withRouter(ComicCharacter));
