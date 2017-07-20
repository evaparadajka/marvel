import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import Logout from "./session/Logout";

export class Layout extends React.Component {
  render() {
    return (
      <div>
        <Navbar name={this.props.name} email={this.props.email} />
        
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
