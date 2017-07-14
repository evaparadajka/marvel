import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

class Logout extends React.Component {
  isLogged = () => {
    if (this.props.email !== "") return true;
    else return false;
  };

  logout = () => {
    this.props.dispatch({
      type: "LOGOUT",
      data: {}
    });
  };

  renderLogout = () => {
    console.log("kalosz");
    if (this.isLogged()) {
      return (
        <Link to="/sign-in" onClick={this.logout} className="nav-style">
          Logout
        </Link>
      );
    } else return null;
  };

  render() {
    return (
      <li>
        {this.isLogged
          ? <Link to="/sign-in" onClick={this.logout} className="nav-style">
              Logout
            </Link>
          : null}
      </li>
    );
  }
}

export default connect()(Logout);
