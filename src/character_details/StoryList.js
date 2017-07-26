import React, { Component } from "react";

import Story from "./Story";

class StoryList extends Component {
  informIfThereAreNoStories = () => {
    if (this.props.stories.length === 0) {
      return <div> There are not any stories in this character.</div>;
    }
  };

  render() {
    return (
      <div>
        <ol>
          {this.props.stories.map((d, index) => <Story name={d.name} />)}
        </ol>
        {this.informIfThereAreNoStories()}
      </div>
    );
  }
}

export default StoryList;
