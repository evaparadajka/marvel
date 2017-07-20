import React from "react";
import Button from "../user_interface/Button";
import StyledOverlay from "../user_interface/StyledOverlay";
import {
  addToFavourites,
  deleteFromFavourites
} from "../character_details/actions";
import { showNotification } from "../lib/functions";
import { connect } from "react-redux";

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  show = () => {
    this.props.show(this.props.id);
  };

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

  addToFav = () => {
    const character = { name: this.props.name, id: this.props.id };
    this.props.dispatch(addToFavourites(character));
    showNotification("Character added!");
  };
  delFromFav = () => {
    const character = { name: this.props.name, binarId: this.props.binarId };
    this.props.dispatch(deleteFromFavourites(character));
    showNotification("Character deleted!");
  };
  isCharInFavs = () => {
    return this.props.isFavourite;
  };
  renderActionButton = () => {
    if (this.isCharInFavs()) {
      return (
        <Button
          className="btn-danger"
          label="Delete from favourites!"
          onClick={this.delFromFav}
        />
      );
    } else {
      return (
        <Button
          className="btn-danger"
          label="Add to favourites!"
          onClick={this.addToFav}
        />
      );
    }
  };

  renderOverlay = () => {
    if (this.isHovered()) {
      return (
        <StyledOverlay>
          <div className="name">
            {this.props.name}
          </div>
          <div>
            <Button
              className="btn-danger"
              label="Details"
              onClick={this.show}
            />
            {this.renderActionButton()}
          </div>
        </StyledOverlay>
      );
    } else return null;
  };

  render() {
    return (
      <div
        className="square"
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
      >
        <img src={this.props.img} alt="Image not found" />

        {this.renderOverlay()}
      </div>
    );
  }
}

export default connect()(Character);
