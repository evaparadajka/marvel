import React, { Component } from "react";

import Creator from "./Creator";

class CreatorList extends Component {
  informIfThereAreNoCreators = () => {
    if (this.props.creators.length === 0) {
      return <div> There are not any creators in this comic.</div>;
    }
  };

  render() {
    return (
      <div>
        <ol>
          {this.props.creators.map((d, index) => <Creator name={d.name} />)}
        </ol>
        {this.informIfThereAreNoCreators()}
      </div>
    );
  }
}

export default CreatorList;
