import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import logo from "./img/marvel_logo.png";

export class Layout extends React.Component {
  render() {
    return (
      <div className="footer">
        <hr />
        <div className="space footer-center">
          <div className="foot-item">
            <a
              style={{
                position: "relative",
                padding: 0,
                paddingLeft: "7px",
                paddingRight: "7px"
              }}
              href="/#/dashboard/0"
            >
              <img src={logo} className="nav-logo" />
            </a>
          </div>
          <div className="foot-item">
            <Link to="/dashboard/0" className="nav-style">
              Characters
            </Link>
          </div>
          <div className="foot-item">
            <Link to="/comics/0" className="nav-style">
              Comics
            </Link>
          </div>
          <div className="foot-item">
            <Link to="/fav-characters" className="nav-style">
              Favourite Characters
            </Link>
          </div>
          <div className="foot-item">
            <Link to="/fav-comics" className="nav-style">
              Favourite Comics
            </Link>
          </div>
          <div className="foot-item">
            <b className="footer-space nav-style">
              &copy; Copyright MARVELAPPS team
            </b>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Layout);
