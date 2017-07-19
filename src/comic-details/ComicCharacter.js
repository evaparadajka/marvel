import React from "react";
import Button from "../user_interface/Button";
import { connect } from "react-redux";
import apiMarvel from "../lib/api-marvel";
import { withRouter } from "react-router";

class ComicCharacter extends React.Component {
  show = id => {
    this.props.router.push("/character-details/" + id);
  };

  getID = () => {
    this.show(
      this.props.resourceURI.slice(
        this.props.resourceURI.length - 7,
        this.props.resourceURI.length
      )
    );
  };

  render() {
    return (
      <div className="table-style">
        <tr>
          <td className="name table">
            {this.props.name}
          </td>
          <td className="table">
            <Button label="SHOW" onClick={this.getID} />
          </td>
        </tr>
      </div>
    );
  }
}

export default connect()(withRouter(ComicCharacter));
