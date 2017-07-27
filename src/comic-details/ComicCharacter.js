import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import StyledOverlay from "../user_interface/StyledOverlay";

class ComicCharacter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  onMouseEnterHandler = () => {
    this.setState({
      hover: true
    });
  };

  onMouseLeaveHandler = () => {
    this.setState({
      hover: false
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

  findThumbnail = URI => {
    if (
      typeof this.props.thumbnails.find(
        p => p.id === parseFloat(URI.slice(URI.length - 7, URI.length))
      ) !== "undefined"
    ) {
      return (
        <img
          src={
            this.props.thumbnails.find(
              p => p.id === parseFloat(URI.slice(URI.length - 7, URI.length))
            ).thumbnail
          }
          alt="Character"
        />
      );
    }
  };

  render() {
    return (
      <div
        className="square-small"
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
      >
        {this.findThumbnail(this.props.resourceURI)}
        {this.renderOverlay()}
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
