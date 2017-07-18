import React from "react";

class Comic extends React.Component {
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

export default Comic;
