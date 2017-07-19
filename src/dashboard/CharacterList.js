import React, { Component } from "react";

import Character from "./Character";

class CharacterList extends Component {
  makeCharacter = d => {
    if (typeof d.thumbnail === "undefined") {
    } else {
      return (
        <Character
          show={this.props.show}
          id={d.id}
          name={d.name}
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
        {this.props.characters.map((d, index) => this.makeCharacter(d))}
      </div>
    );
  }
}

export default CharacterList;
