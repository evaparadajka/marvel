import React from "react";

class Creator extends React.Component {
  render() {
    return (
      <li>
        {this.props.name}
      </li>
    );
  }
}

export default Creator;
