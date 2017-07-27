import React from "react";
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
              <img src={logo} alt="logo" className="nav-logo" />
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
              <img src={facebook} alt="facebook icon" className="footer-logo" />
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
              <img src={google} alt="google icon" className="footer-logo" />
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
              <img src={twitter} alt=" twitter icon" className="footer-logo" />
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
              <img src={youtube} alt="youtube icon" className="footer-logo" />
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
