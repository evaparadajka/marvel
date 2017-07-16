import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import Logout from "./session/Logout";

export class Layout extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <ul className="nav navbar-nav">
            <li>
              <a className="navbar-left" href="#">
                <i className="fa fa-paw nav-style" />
              </a>
            </li>
            <li className="active">
              <Link to="/" className="nav-style">
                Characters
              </Link>
            </li>
            <li className="active">
              <Link to="/comics" className="nav-style">
                Comics
              </Link>
            </li>
            <li className="active">
              <Link to="/fav-characters" className="nav-style">
                Favourite Characters
              </Link>
            </li>
            <li className="active">
              <Link to="/fav-comics" className="nav-style">
                Favourite Comics
              </Link>
            </li>
          </ul>
          <ul className="nav navbar-nav right">
            <li>
              <spam className="nav-style welcome">
                {" "}Hello {this.props.email}
              </spam>
            </li>
            <Logout email={this.props.email} />
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
