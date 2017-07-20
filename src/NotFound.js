import React from "react";
import StyledCharacterBase from "./user_interface/StyledCharacterBase";

class NotFound extends React.Component {
  render() {
    return (
      <StyledCharacterBase>
        <div className="square">
          <h1 className="bottom-overlay">PAGE NOT FOUND</h1>
        </div>
      </StyledCharacterBase>
    );
  }
}

export default NotFound;
