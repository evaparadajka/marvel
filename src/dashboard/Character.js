import React from "react";
import Button from "../user_interface/Button";
import StyledOverlay from "../user_interface/StyledOverlay";
import {
  addToFavourites,
  deleteFromFavourites
} from "../character_details/actions";
import { showNotification } from "../alert/notifications";
import { connect } from "react-redux";
import Notifications, { success, error } from "react-notification-system-redux";
import PropTypes from "prop-types";
import {
  notificationCharacterAdded,
  notificationCharacterDeleted
} from "../alert/notifications";

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  showNotification = message => {
    this.context.store.dispatch(message);
  };

  show = event => {
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

  addToFav = event => {
    event.stopPropagation();

    const character = { name: this.props.name, id: this.props.id };
    this.props.dispatch(addToFavourites(character));
    this.showNotification(success(notificationCharacterAdded));
  };

  delFromFav = event => {
    event.stopPropagation();

    const character = { name: this.props.name, binarId: this.props.binarId };
    this.props.dispatch(deleteFromFavourites(character));
    this.showNotification(error(notificationCharacterDeleted));
  };

  isCharInFavs = () => {
    return this.props.isFavourite;
  };

  renderActionIcons = () => {
    if (this.isCharInFavs()) {
      return (
        <div>
          <Button
            onClick={this.delFromFav}
            className="btn-danger"
            label="Delete from favourites!"
          />
        </div>
      );
    } else {
      return (
        <div className="action-icon">
          <Button
            onClick={this.addToFav}
            className="btn-danger"
            label="Add to favourites!"
          />
        </div>
      );
    }
  };

  renderOverlay = () => {
    if (this.isHovered()) {
      return (
        <StyledOverlay onClick={this.show}>
          <div className="name">
            {this.props.name}
          </div>
          <div>
            {this.renderActionIcons()}
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

Character.contextTypes = {
  store: PropTypes.object
};
export default connect()(Character);
