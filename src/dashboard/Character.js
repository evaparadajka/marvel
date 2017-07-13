import React from "react";

import Button from "../user_interface/Button";
import StyledCharacter from "../user_interface/StyledCharacter";

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    //this.logDate = this.logDate.bind(this);
    //this.addPost = this.addPost.bind(this);
  }

  show = () => {
    this.props.show(this.props.id);
  };

  // render() {
  //   return (
  //     <div className="col-md-4">
  //       <StyledCharacter>
  //         {this.props.img}
  //         <div>
  //           ID: {this.props.id}
  //         </div>

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
    // let inner = normal;
    // if (this.state.hover) {
    //   inner = hover;
    // }

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
  //backgroundColor: "black",
  //opacity: "0.5"
  // border: "solid 1px green"
};
//
// var description = {
//   margin: "11%"
// };

export default Character;
