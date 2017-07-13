import React from "react";
import { Link } from "react-router";

import styled from "styled-components";
import { connect } from "react-redux";

export class Layout extends React.Component {
  logout = () => {
    this.props.dispatch({
      type: "LOGOUT",
      data: {}
    });
  };

  isLogged = () => {
    if (this.props.email !== "") {
      return (
        <Link to="/sign-in" onClick={this.logout} className="nav-style">
          Logout
        </Link>
      );
    } else {
      return (
        <Link to="/sign-in" className="nav-style">
          Login
        </Link>
      );
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <ul className="nav navbar-nav">
            <li>
              <a className="navbar-left" href="#">
                <i className="fa fa-paw nav-style" fontaria-hidden="true" />
              </a>
            </li>
            <li className="active">
              <Link to="/" className="nav-style">
                Dashboard
              </Link>
            </li>
            <li className="active">
              <Link to="/characters" className="nav-style">
                Characters
              </Link>
            </li>
          </ul>
          <ul className="nav navbar-nav right">
            <li>
              {this.props.email &&
                <Link className="nav-style welcome">
                  {" "}Hello {this.props.email}
                </Link>}
            </li>
            <li>
              {this.isLogged()}
            </li>
          </ul>
        </div>
        <hr />
        <div className="container-fluid">
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.session.email
  };
};
export default connect(mapStateToProps)(Layout);
