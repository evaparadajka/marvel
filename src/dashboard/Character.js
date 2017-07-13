import React from "react";

import Button from "../user_interface/Button";
import StyledCharacter from "../user_interface/StyledCharacter";

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

  renderOverlay = () => {
    if (this.isHovered()) {
      return (
        <div style={after}>
          <div>
            <Button onClick={this.show} label="SHOW DETAILS" />
          </div>
          <div>
            {this.props.name}
          </div>
          <div>
            {this.props.description}
          </div>
        </div>
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

var after = {
  position: "absolute",
  top: "0px",

  left: 0,
  width: "100%",
  height: "100%",
  display: "block",
  color: "black",
  background: "rgba(255, 255, 255, 0.6)"
};

export default Character;
