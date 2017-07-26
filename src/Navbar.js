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
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  showSettings = e => {
    e.preventDefault();
  };

  render() {
    var isMenuOpen = state => {
      if (state.isOpen) {
        this.setState({
          open: true
        });
      } else {
        this.setState({
          open: false
        });
      }
      return state.isOpen;
    };
    return (
      <Menu
        width={"100%"}
        customBurgerIcon={<img src={burgerIcon} />}
        styles={styleMenu}
        noOverlay
        onStateChange={isMenuOpen}
        isOpen={window.innerWidth > 1120 ? true : undefined}
      >
        <nav>
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
                  href="/#/dashboard/0"
                >
                  <img src={logo} className="nav-logo" />
                </a>
              </div>

              <li className="menu-item active">
                <Link to="/dashboard/0" className="nav-style">
                  Characters
                </Link>
              </li>
              <li className="active menu-item">
                <Link to="/comics/0" className="nav-style">
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

              <li className="nav-style menu-item">
                <Link to="/user-profile" className="nav-style userName">
                  Hello, {this.props.name}!
                </Link>
              </li>
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
    position: "fixed",
    zIndex: "10"
  },
  bmCrossButton: {
    width: "45px",
    height: "45px",
    position: "absolute",
    top: "2px",
    left: "2px"
  },
  bmCross: {
    width: "45px",
    height: "45px",
    position: "absolute",
    top: "2px",
    left: "2px"
  },
  bmOverlay: {
    height: "52px"
  },
  bmMenuWrap: {
    height: "auto"
  }
};
export default connect()(Layout);
