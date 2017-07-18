import React from "react";

class Comic extends React.Component {
  render() {
    return (
      // 2 divy?
      <div>
        <div>
          {this.props.name}
        </div>
      </div>
    );
  }
}

export default Comic;
