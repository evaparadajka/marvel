import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import logo from "./img/marvel_logo.png";
import Logout from "./session/Logout";

export class Layout extends React.Component {
  render() {
    return (
      <nav className="navbar-fixed-top">
        <div className="nav ">
          <ul className="nav navbar-nav">
            <li>
              <a href="/" className="nav-style">
                <img src={logo} className="nav-logo" />
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

            <li className="nav-style ">
              <b>
                Hello, {this.props.name}!
              </b>
            </li>
            <Logout email={this.props.email} />
          </ul>
        </div>
        <hr />
      </nav>
    );
  }
}

export default connect()(Layout);
