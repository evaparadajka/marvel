import React, { Component } from "react";

import Character from "./Character";

class CharacterList extends Component {
  render() {
    console.log(this.props);

    return (
      <div>
        {this.props.characters.map((d, index) =>
          <Character
            id={d.id}
            name={d.name}
            description={d.description}
            img={d.img}
          />
        )}
      </div>
    );
  }
}

export default CharacterList;
