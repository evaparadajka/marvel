import React from "react";

class CharactersDashboardInComic extends React.Component {
  render() {
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
