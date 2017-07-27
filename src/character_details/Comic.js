import React from "react";

class Comic extends React.Component {
  extractID(URI) {
    if (isNaN(URI[URI.length - 5])) {
      if (isNaN(URI[URI.length - 4])) {
        return URI.slice(URI.length - 3, URI.length);
      } else {
        return URI.slice(URI.length - 4, URI.length);
      }
    } else {
      return URI.slice(URI.length - 5, URI.length);
    }
  }

  show = event => {
    this.props.show(this.extractID(this.props.resourceURI));
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
