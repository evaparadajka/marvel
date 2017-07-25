import React from "react";

class Comic extends React.Component {
  lookingForNumber() {
    if (isNaN(this.props.resourceURI[this.props.resourceURI.length - 5])) {
      if (isNaN(this.props.resourceURI[this.props.resourceURI.length - 4])) {
        return this.props.resourceURI.slice(
          this.props.resourceURI.length - 3,
          this.props.resourceURI.length
        );
      } else {
        return this.props.resourceURI.slice(
          this.props.resourceURI.length - 4,
          this.props.resourceURI.length
        );
      }
    } else {
      return this.props.resourceURI.slice(
        this.props.resourceURI.length - 5,
        this.props.resourceURI.length
      );
    }
  }

  show = event => {
    this.props.show(this.lookingForNumber());
  };

  render() {
    return (
      <li className="comicHover" onClick={this.show}>
        {this.props.name}
      </li>
    );
  }
}

export default Comic;
