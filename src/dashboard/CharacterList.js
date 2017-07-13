import React, { Component } from "react";

import Character from "./Character";

class CharacterList extends Component {
  render() {
    console.log("Props w CharacterList", this.props);
    console.log(this.props.characters.length);
    return (
      <div>
        {this.props.characters.map((d, index) =>
          <Character
            show={this.props.show}
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
