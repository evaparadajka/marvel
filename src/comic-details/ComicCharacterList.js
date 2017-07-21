import React, { Component } from "react";

import ComicCharacter from "./ComicCharacter";

class ComicCharacterList extends Component {
  render() {
    return (
      <ol>
        {this.props.characters.map((d, index) =>
          <ComicCharacter name={d.name} resourceURI={d.resourceURI} />
        )}
      </ol>
    );
  }
}

export default ComicCharacterList;
