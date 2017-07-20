import React, { Component } from "react";

import Comic from "./Comic";

class ComicList extends Component {
  render() {
    return (
      <ol>
        {this.props.comics.map((d, index) => <Comic name={d.name} />)}
      </ol>
    );
  }
}

export default ComicList;
