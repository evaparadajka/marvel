import React, { Component } from "react";
import Comic from "./Comic";

class ComicList extends Component {
  makeComic = d => {
    if (typeof d.thumbnail === "undefined") {
    } else {
      return (
        <Comic
          show={this.props.show}
          id={d.id}
          title={d.title}
          description={d.description}
          img={`${d.thumbnail.path}/standard_fantastic.jpg`}
          isFavourite={d.isFavourite}
          binarId={d.binarId}
        />
      );
    }
  };

  render() {
    return (
      <div className="space">
        {this.props.comics.map((d, index) => this.makeComic(d))}
      </div>
    );
  }
}

export default ComicList;
