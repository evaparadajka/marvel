import React, { Component } from "react";

import Character from "./Character";

class CharacterList extends Component {
  render() {
    // console.log x2
    console.log(this.props.characters);
    // console.log(this.props.characters);
    return (
      <div className="space">
        {this.props.characters.map((d, index) =>
          <Character
            show={this.props.show}
            id={d.id}
            name={d.name}
            title={d.title}
            description={d.description}
            img={`${d.thumbnail.path}/standard_fantastic.jpg`}
            isFavourite={d.isFavourite}
          />
        )}
      </div>
    );
  }
}

export default CharacterList;
