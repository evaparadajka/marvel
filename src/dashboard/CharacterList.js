import React, { Component } from "react";
import apiMarvelId from "../lib/api-marvel-id";
import Character from "./Character";
import { connect } from "react-redux";

class CharacterList extends Component {
  makeCharacter = d => {
    if (typeof d.thumbnail === "undefined") {
      if (typeof d.needCharacterID !== "undefined") {
        console.log(d.needCharacterID);
      }
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

export default connect()(CharacterList);

// apiMarvelId
//   .get(`${d.needCharacterID}`)
//   .then(response => {
//     this.props.dispatch({
//       type: "FETCH_ONE_USER_CHAR",
//       payload: response.data.data.results[0]
//     });
//   })
//   .catch(error => {
//     console.log(error);
//   });
