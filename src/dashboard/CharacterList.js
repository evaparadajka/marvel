import React, { Component } from "react";

import Character from "./Character";

class CharacterList extends Component {
  render() {
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
          />
        )}
      </div>
    );
  }
}

export default CharacterList;
