import React, { Component } from "react";

import Character from "./Character";

class CharacterList extends Component {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.characters.map((d, index) =>
          <Character id={d.id} name={d.name} description={d.description} />
        )}
      </div>
    );
  }
}

export default CharacterList;
