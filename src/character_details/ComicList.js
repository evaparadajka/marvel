import React, { Component } from "react";

import Comic from "./Comic";

class ComicList extends Component {
  informIfThereAreNoComics = () => {
    if (this.props.comics.length === 0) {
      return <div> There are not any comics in this character.</div>;
    }
  };

  render() {
    return (
      <div>
        <ol>
          {this.props.comics.map((d, index) =>
            <Comic
              show={this.props.show}
              name={d.name}
              resourceURI={d.resourceURI}
            />
          )}
        </ol>
        {this.informIfThereAreNoComics()}
      </div>
    );
  }
}

export default ComicList;
