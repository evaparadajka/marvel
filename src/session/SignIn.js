import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Button from "../user-interface/Button";
import apiClient from "../lib/api-client";
import { signIn } from "./session-actions";
import { Link } from "react-router";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  updateName = e => {
    this.setState({
      email: e.target.value
    });
  };

  updateName2 = e => {
    this.setState({
      password: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.dispatch(
      signIn({
        email: this.state.email,
        password: this.state.password
      })
    );
  };
  showError = () => {};

  render() {
    //console.log(this.props);
    return (
      <div className="text-center">
        <form className="form-group">
          <label>Mail: </label>
          <input
            className="form-control"
            onChange={this.updateName}
            type="email"
            value={this.state.email}
          />

          <label>Password: </label>
          <input
            className="form-control"
            onChange={this.updateName2}
            type="password"
            value={this.state.password}
          />
          <br />
          <Button
            onClick={this.onSubmit}
            label={"Sign in"}
            className="btn-danger"
          />
          <h2>
            Or
            <Link to="/sign-up" style={{ color: "#c94c4c" }}>
              {" "}Sign up
            </Link>
            <br />
            {this.state.error}
            {this.props.session.status}
          </h2>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(withRouter(SignIn));
