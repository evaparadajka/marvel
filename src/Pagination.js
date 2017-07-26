import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

export class Pagination extends React.Component {
  setActivePage = () => {
    this.props.onClick(this.props.id);
  };

  renderPagesNumbers = () => {
    let resultArray = [];
    for (var key in this.props.pages) {
      resultArray.push(key);
    }
    return resultArray.map(p => {
      return (
        <div id={p} onClick={this.setActivePage}>
          {p}
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        Pagination:
        <br />
        {this.renderPagesNumbers()}
      </div>
    );
  }
}

export default connect()(Pagination);
