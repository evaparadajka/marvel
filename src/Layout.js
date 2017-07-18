import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import Logout from "./session/Logout";

export class Layout extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar-fixed-top">
          <div className="nav ">
            <ul className="nav navbar-nav">
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
              {/* </ul>
              <ul className="nav right "> */}
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

        <section className="container-fluid">
          <div className="row">
            {this.props.children}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.session.email,
    name: state.session.name
  };
};
export default connect(mapStateToProps)(Layout);
