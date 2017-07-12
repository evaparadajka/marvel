import React, { Component } from "react";

import Comic from "./Comic";

class ComicList extends Component {
  render() {
    return (
      <div>
        {this.props.comics.map((d, index) => <Comic name={d.name} />)}
      </div>
    );
  }
}

export default ComicList;
