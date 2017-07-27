import React from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";

export class Layout extends React.Component {
  render() {
    return (
      <div>
        <Navbar name={this.props.name} email={this.props.email} />
        <section className="container-fluid height-containter">
          <div className="row">
            {this.props.children}
          </div>
        </section>
        <Footer />
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
