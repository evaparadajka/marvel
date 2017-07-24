import React, { Component } from "react";

import Comic from "./Comic";

class ComicList extends Component {
  anyComics = () => {
    if (this.props.comics.length === 0) {
      return <div> There are not any comics in this character.</div>;
    }
  };

  render() {
    return (
      <div>
        <ol>
          {this.props.comics.map((d, index) => <Comic name={d.name} />)}
        </ol>
        {this.anyComics()}
      </div>
    );
  }
}

export default ComicList;
