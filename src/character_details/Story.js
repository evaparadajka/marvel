import React from "react";

class Story extends React.Component {
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

export default Story;
