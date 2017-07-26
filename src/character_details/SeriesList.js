import React, { Component } from "react";

import Story from "./Story";

class SeriesList extends Component {
  informIfThereAreNoSeries = () => {
    if (this.props.series.length === 0) {
      return <div> There are not any series in this character.</div>;
    }
  };

  render() {
    return (
      <div>
        <ol>
          {this.props.series.map((d, index) => <Story name={d.name} />)}
        </ol>
        {this.informIfThereAreNoSeries()}
      </div>
    );
  }
}

export default SeriesList;
