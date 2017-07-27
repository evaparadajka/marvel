import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import logo from "./img/marvel_logo.png";
import facebook from "./img/facebook.png";
import google from "./img/googleplus.png";
import twitter from "./img/twitter.png";
import youtube from "./img/youtube.png";

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
              href="http://marvel.com/"
            >
              <img src={logo} className="nav-logo" />
            </a>
          </div>
          <div className="foot-item">
            <a
              style={{
                position: "relative",
                padding: 0,
                paddingLeft: "7px",
                paddingRight: "7px"
              }}
              href="https://www.facebook.com/Marvel"
            >
              <img src={facebook} className="footer-logo" />
            </a>
          </div>
          <div className="foot-item">
            <a
              style={{
                position: "relative",
                padding: 0,
                paddingLeft: "7px",
                paddingRight: "7px"
              }}
              href="https://plus.google.com/+marvel/posts"
            >
              <img src={google} className="footer-logo" />
            </a>
          </div>
          <div className="foot-item">
            <a
              style={{
                position: "relative",
                padding: 0,
                paddingLeft: "7px",
                paddingRight: "7px"
              }}
              href="https://twitter.com/#!/marvel"
            >
              <img src={twitter} className="footer-logo" />
            </a>
          </div>
          <div className="foot-item">
            <a
              style={{
                position: "relative",
                padding: 0,
                paddingLeft: "7px",
                paddingRight: "7px"
              }}
              href="http://www.youtube.com/marvel"
            >
              <img src={youtube} className="footer-logo" />
            </a>
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
