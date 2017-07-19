import React from "react";

class CharactersDashboardInComic extends React.Component {
  render() {
    console.log("CharactersDashboardInComic");
    return (
      <div>
        <p>
          {this.props.character}
        </p>
      </div>
    );
  }
}

export default CharactersDashboardInComic;
