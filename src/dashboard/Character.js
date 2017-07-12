import React from "react";

import StyledCharacter from "../user_interface/StyledCharacter";

class Character extends React.Component {
  render() {
    return (
      <div className="col-md-4">
        <StyledCharacter>
          <div>
            ID: {this.props.id}{" "}
          </div>
          <div>
            Name: {this.props.name}
          </div>
          <div>
            Description: {this.props.description}
          </div>
        </StyledCharacter>
      </div>
    );
  }
}

export default Character;
