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
    console.log("enter");
  };
  onMouseLeaveHandler = () => {
    this.setState({
      hover: false
    });
    console.log("leave");
  };

  isHovered = () => {
    return this.state.hover;
  };

  renderOverlay = () => {
    if (this.isHovered()) {
      return (
        <StyledOverlay>
          <div>
            <Button onClick={this.show} label="SHOW DETAILS" />
          </div>
          <div>
            {this.props.name}
          </div>
          <div>
            {this.props.description}
          </div>
        </StyledOverlay>
      );
    } else return null;
  };

  render() {
    return (
      <div
        className="col-md-4"
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
