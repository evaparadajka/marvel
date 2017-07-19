import React, { Component } from "react";

import ComicCharacter from "./ComicCharacter";

class ComicCharacterList extends Component {
  render() {
    return (
      <div>
        {this.props.characters.map((d, index) =>
          <ComicCharacter name={d.name} resourceURI={d.resourceURI} />
        )}
      </div>
    );
  }
}

export default ComicCharacterList;
