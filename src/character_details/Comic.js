import React from "react";

class Comic extends React.Component {
  render() {
    return (
      <li>
        {this.props.name}
      </li>
    );
  }
}

export default Comic;
