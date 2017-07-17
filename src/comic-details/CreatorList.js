import React, { Component } from "react";

import Creator from "./Creator";

class CreatorList extends Component {
  render() {
    return (
      <div>
        {this.props.creators.map((d, index) => <Creator name={d.name} />)}
      </div>
    );
  }
}

export default CreatorList;
