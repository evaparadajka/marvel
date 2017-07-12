import React from "react";

import Button from "../user_interface/Button";
import StyledCharacter from "../user_interface/StyledCharacter";

class Character extends React.Component {
  show = () => {
    this.props.show(this.props.id);
  };

  render() {
    return (
      <div className="col-md-4">
        <StyledCharacter>
          {this.props.img}
          <div>
            ID: {this.props.id}
          </div>
          <div>
            Name: {this.props.name}
          </div>
          <div>
            Description: {this.props.description}
          </div>
          <Button onClick={this.show} label="SHOW DETAILS" />
        </StyledCharacter>
      </div>
    );
  }
}

export default Character;
