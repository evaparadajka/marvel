import React from "react";
import { Link } from "react-router";

import styled from "styled-components";
import { connect } from "react-redux";
// do wywalenia
/**
 * ComponentName
 */
export class Layout extends React.Component {
  logout = () => {
    // akcje wydzielcie do pliku
    this.props.dispatch({
      type: "LOGOUT",
      data: {}
    });
    // do wywalenia
    //przejscie do strony posts
    this.props.router.push("posts");
  };
  
  // zła nazwa funkcja 'isLogged' wg nazwy powinna zwrócic true/false a nie komponent
  // rozbij na funkcję która renderuje link i taką która sprawdza czy jest zalogowany
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
          {/* inline style, przenieś do styled-components  */}
          style={{
            borderBottom: "solid",
            borderBottomColor: "#c94c4c",
            color: "#eee"
          }}>
          <ul className="nav navbar-nav">
            <li>
              <a className="navbar-left" href="#">
                <i
                  className="fa fa-paw "
                  {/* inline style, przenieś do styled-components  */}
                  style={{ color: "#c94c4c" }}
                  fontaria-hidden="true"
                />
              </a>
            </li>
            <li className="active">
              {/* inline style, przenieś do styled-components  */}
              <Link to="/" style={{ color: "#c94c4c" }}>
                Dashboard
              </Link>
            </li>

            <li className="active">
              {/* inline style, przenieś do styled-components  */}
              <Link to="/" style={{ color: "#c94c4c" }}>
                Characters
              </Link>
            </li>

            <li>
              {/* inline style, przenieś do styled-components, co to za pusta spacja? */}
              <Link to="/sign-up" style={{ color: "#c94c4c" }}>
                {" "}Sign up
              </Link>
            </li>
            <li>
              {/* inline style, przenieś do styled-components, co to za pusta spacja? */}
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
            {/* do wywalenia */}
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

// nazwa nic nie mówi
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
