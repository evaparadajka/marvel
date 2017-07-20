import React, { Component } from "react";

import Story from "./Story";

class StoryList extends Component {
  render() {
    return (
      <ol>
        {this.props.stories.map((d, index) => <Story name={d.name} />)}
      </ol>
    );
  }
}

export default StoryList;
