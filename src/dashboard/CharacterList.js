import React, { Component } from "react";

import Character from "./Character";

class CharacterList extends Component {
  render() {
    console.log(this.props.characters, "kalosz");
    return (
      <div className={this.props.className}>
        {this.props.characters.map((d, index) =>
          <Character
            id={d.id}
            name={d.name}
            description={d.description}
            img={`${d.thumbnail.path}/standard_fantastic.jpg`}
          />
        )}
      </div>
    );
  }
}

export default CharacterList;
