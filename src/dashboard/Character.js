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
      // actionButtonClicked: false
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
  // setActionButtonClicked = () => {
  //   this.setState({
  //     actionButtonClicked: true
  //   });
  // };
  addToFav = event => {
    event.stopPropagation();
    console.log("add", event);
    console.log(this.state.actionButtonClicked);
    this.showNotification(success(notificationCharacterAdded));
    const character = { name: this.props.name, id: this.props.id };
    this.props.dispatch(addToFavourites(character));
  };
  delFromFav = event => {
    event.stopPropagation();
    console.log("del", event);
    this.showNotification(error(notificationCharacterDeleted));
    const character = { name: this.props.name, binarId: this.props.binarId };
    this.props.dispatch(deleteFromFavourites(character));
  };
  isCharInFavs = () => {
    return this.props.isFavourite;
  };
  renderActionIcons = () => {
    if (this.isCharInFavs()) {
      return (
        <div>
          <i
            onClick={this.delFromFav}
            className="fa fa-trash-o fa-3x nav-style "
          />
        </div>
      );
    } else {
      return (
        <div className="action-icon">
          <i onClick={this.addToFav} className="fa fa-star fa-3x nav-style" />
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
