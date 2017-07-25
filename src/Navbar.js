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
      <Menu
        width={"100%"}
        customCrossIcon={<img src={exit} />}
        customBurgerIcon={<img src={burgerIcon} />}
        isOpen={true}
        styles={styleMenu}
        noOverlay
      >
        <nav className="">
          <div className="nav">
            <ul className="nav navbar-nav">
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

              <li className="menu-item active">
                <Link to="/" className="nav-style">
                  Characters
                </Link>
              </li>
              <li className="active menu-item">
                <Link to="/comics" className="nav-style">
                  Comics
                </Link>
              </li>
              <li className="active menu-item">
                <Link to="/fav-characters" className="nav-style">
                  Favourite Characters
                </Link>
              </li>
              <li className="active menu-item">
                <Link to="/fav-comics" className="nav-style">
                  Favourite Comics
                </Link>
              </li>

              <div className="nav-style menu-item">
                <b>
                  Hello, {this.props.name}!
                </b>
              </div>
              <Logout email={this.props.email} />
            </ul>
          </div>
          <hr />
        </nav>
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
const styleMenu = {
  bmBurgerButton: {
    position: "relative"
  },
  bmOverlay: {
    height: "52px"
  },
  bmMenuWrap: {
    height: "auto"
  }
};
export default connect()(Layout);
