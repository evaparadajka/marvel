import React from "react";

import Button from "../user_interface/Button";
import StyledCharacter from "../user_interface/StyledCharacter";
import StyledOverlay from "../user_interface/StyledOverlay";

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

  isToLong = text => {
    if (text.length > 100) {
      return (
        <div className="description">
          {text.slice(0, 100)}...
        </div>
      );
    } else {
      return (
        <div className="description">
          {text}
        </div>
      );
    }
  };

  isHovered = () => {
    return this.state.hover;
  };

  renderOverlay = () => {
    if (this.isHovered()) {
      return (
        <div>
          <StyledOverlay>
            <div />
            <div className="name">
              {this.props.name ? this.props.name : this.props.title}
            </div>

            <Button
              className="btn-danger"
              label="Details"
              onClick={this.show}
            />
          </StyledOverlay>
        </div>
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
        <StyledCharacter>
          <img src={this.props.img} />
        </StyledCharacter>
        {this.renderOverlay()}
      </div>
    );
  }
}

export default Character;
