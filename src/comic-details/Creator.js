import React from "react";

class Creator extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.name}
        </div>
      </div>
    );
  }
}

export default Creator;
