import React from "react";
import { Link } from "react-router";

import styled from "styled-components";
import { connect } from "react-redux";
/**
 * ComponentName
 */
export class Layout extends React.Component {
  logout = () => {
    this.props.dispatch({
      type: "LOGOUT",
      data: {}
    });
    //przejscie do strony posts
    this.props.router.push("posts");
  };
  isLogged = () => {
    if (this.props.email !== "") {
      return (
        <Link style={{ color: "#c94c4c" }} onClick={this.logout}>
          Logout
        </Link>
      );
    } else {
      return (
        <Link to="/sign-in" style={{ color: "#c94c4c" }}>
          Login
        </Link>
      );
    }
  };
  render() {
    return (
      <StyledComponent className="container-fluid">
        <div
          className="row"
          style={{
            borderBottom: "solid",
            borderBottomColor: "#c94c4c",
            color: "#eee"
          }}
        >
          <ul className="nav navbar-nav">
            <li>
              <a className="navbar-left" href="#">
                <i
                  className="fa fa-paw "
                  style={{ color: "#c94c4c" }}
                  fontaria-hidden="true"
                />
              </a>
            </li>
            <li className="active">
              <Link to="/" style={{ color: "#c94c4c" }}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/sign-up" style={{ color: "#c94c4c" }}>
                {" "}Sign up
              </Link>
            </li>
            <li>
              {this.props.email &&
                <Link style={{ color: "#c94c4c" }}>
                  {" "}Hello {this.props.email}
                </Link>}
            </li>
            <li>
              {this.isLogged()}
            </li>
          </ul>
        </div>
        <div className="container-fluid">
          <div className="row">
            {this.props.children}
            {/* {React.Children.map(this.props.children, c =>
							React.cloneElement(c, { injectedProp: "props from layout" })
						)} */}
            {/* {React.Children.map(this.props.children, c =>
							React.cloneElement(c, { counter: this.updateCounter })
						)} */}
          </div>
        </div>
      </StyledComponent>
    );
  }
}

const StyledComponent = styled.div`
  background-color: green,
  font-size: 20px,
  color: #fff
`;
const mapStateToProps = state => {
  return {
    email: state.session.email
  };
};
export default connect(mapStateToProps)(Layout);
