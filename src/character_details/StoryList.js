import React, { Component } from "react";

import Story from "./Story";

class StoryList extends Component {
  render() {
    return (
      <div>
        {this.props.stories.map((d, index) => <Story name={d.name} />)}
      </div>
    );
  }
}

export default StoryList;
