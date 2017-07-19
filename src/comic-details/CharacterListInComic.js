import React, { Component } from "react";

import CharacterInComic from "./CharacterInComic";

class CharacterList extends Component {
  render() {
    //console.log(this.props.characters);
    // console.log(this.props.characters);
    return (
      <div className="space">
        {this.props.characters.map((d, index) =>
          <CharacterInComic
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
