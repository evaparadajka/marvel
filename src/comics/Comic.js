import React from "react";
import Button from "../user_interface/Button";
import StyledOverlay from "../user_interface/StyledOverlay";
import {
  addToFavourites,
  deleteFromFavourites
} from "../comic-details/actions";
// import { showNotification } from "../alert/notifications";
import { connect } from "react-redux";
import {
  notificationComicAdded,
  notificationComicDeleted
} from "../alert/notifications";
import PropTypes from "prop-types";
import Notifications, { success } from "react-notification-system-redux";

class Comic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }
  showNotification = notificationOpts => {
    this.context.store.dispatch(success(notificationOpts));
  };
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
    this.showNotification(notificationComicAdded);
    const comic = { title: this.props.title, id: this.props.id };
    this.props.dispatch(addToFavourites(comic));
    // showNotification("Comic added!");
  };
  delFromFav = () => {
    this.showNotification(notificationComicDeleted);
    const comic = { title: this.props.title, binarId: this.props.binarId };
    this.props.dispatch(deleteFromFavourites(comic));
    // showNotification("Comic deleted!");
  };
  isComicInFavs = () => {
    console.log(this.props.isFavourite);
    return this.props.isFavourite;
  };
  renderActionButton = () => {
    if (this.isComicInFavs()) {
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
            {this.props.title}
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

Comic.contextTypes = {
  store: PropTypes.object
};
export default connect()(Comic);
