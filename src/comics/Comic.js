import React from "react";
import Button from "../user_interface/Button";
import StyledOverlay from "../user_interface/StyledOverlay";
import {
  addToFavourites,
  deleteFromFavourites
} from "../comic-details/actions";
import { connect } from "react-redux";
import {
  notificationComicAdded,
  notificationComicDeleted
} from "../alert/notifications";
import PropTypes from "prop-types";
import { success, error } from "react-notification-system-redux";
import ReactLoading from "react-loading";

class Comic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      click: false,
      isFavourite: this.props.isFavourite
    };
  }

  showNotification = message => {
    this.context.store.dispatch(message);
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

  addToFav = event => {
    this.setState({
      click: true
    });
    event.stopPropagation();
    const comic = { title: this.props.title, id: this.props.id };
    this.props.dispatch(addToFavourites(comic));
    this.showNotification(success(notificationComicAdded));
  };

  delFromFav = event => {
    this.setState({
      click: true
    });
    event.stopPropagation();
    const comic = { title: this.props.title, binarId: this.props.binarId };
    this.props.dispatch(deleteFromFavourites(comic));
    this.showNotification(error(notificationComicDeleted));
  };

  isComicInFavs = () => {
    if (this.state.isFavourite !== this.props.isFavourite) {
      this.setState({
        click: false,
        isFavourite: this.props.isFavourite
      });
    }
    return this.props.isFavourite;
  };

  renderActionButton = () => {
    this.isComicInFavs();
    if (this.state.click) {
      return (
        <div className="spin">
          <ReactLoading
            type="bubbles"
            color="#a91c1c"
            height="34px"
            width="34px"
            delay="0"
          />
        </div>
      );
    } else {
      if (this.isComicInFavs()) {
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
    }
  };

  renderOverlay = () => {
    if (this.isHovered()) {
      return (
        <StyledOverlay onClick={this.show}>
          <div className="name">
            {this.props.title}
          </div>
          <div>
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
        <img src={this.props.img} alt="Comic" />
        {this.renderOverlay()}
      </div>
    );
  }
}

Comic.contextTypes = {
  store: PropTypes.object
};
export default connect()(Comic);
