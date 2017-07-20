import React, { Component } from "react";

import Creator from "./Creator";

class CreatorList extends Component {
  render() {
    return (
      <ol>
        {this.props.creators.map((d, index) => <Creator name={d.name} />)}
      </ol>
    );
  }
}

export default CreatorList;
