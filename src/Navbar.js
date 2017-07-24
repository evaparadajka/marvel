import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import logo from "./img/marvel_logo.png";
import burgerIcon from "./img/burgerIcon.png";
import exit from "./img/exit.png";
import Logout from "./session/Logout";
import styled from "styled-components";
import { slide as Menu } from "react-burger-menu";

export class Layout extends React.Component {
  showSettings = e => {
    e.preventDefault();
  };

  render() {
    return (
      <Menu customCrossIcon={<img src={exit} />} isOpen={true}>
        <div className="nav">
          <div className="">
            <div className="menu-item">
              <a
                style={{
                  position: "relative",
                  padding: 0,
                  paddingLeft: "7px",
                  paddingRight: "7px"
                }}
                href="/#/"
              >
                <img src={logo} className="nav-logo" />
              </a>
            </div>

            <div className="active menu-item">
              <Link to="/" className="nav-style">
                Characters
              </Link>
            </div>
            <div className="active menu-item">
              <Link to="/comics" className="nav-style">
                Comics
              </Link>
            </div>
            <div className="active menu-item">
              <Link to="/fav-characters" className="nav-style">
                Favourite Characters
              </Link>
            </div>
            <div className="active menu-item">
              <Link to="/fav-comics" className="nav-style">
                Favourite Comics
              </Link>
            </div>

            <div className="nav-style menu-item">
              <b>
                Hello, {this.props.name}!
              </b>
            </div>
            <Logout email={this.props.email} />
          </div>
        </div>
        <hr />
      </Menu>
    );
  }
}
const StyledA = styled.a`
  position: relative;
  /* display: block; */
  padding: 0;
  padding-left: 7px;
  padding-right: 7px;
`;
export default connect()(Layout);
