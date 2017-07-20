import React from "react";

class Story extends React.Component {
  render() {
    return (
      <li>
        {this.props.name}
      </li>
    );
  }
}

export default Story;
