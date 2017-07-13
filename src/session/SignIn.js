import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Button from "../user_interface/Button";
import apiClient from "../lib/api-client";
import { signIn } from "./session-actions";
import { Link } from "react-router";
import StyledLog from "../user_interface/StyledLog";

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
    return (
      <div className="container-fluid background">
        <form className="form-group">
          <StyledLog className="log-style">
            <br />
            <label>Mail: </label>
            <input
              className="form-control"
              onChange={this.updateName}
              type="email"
              value={this.state.email}
            />
            <br />
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
              <Link to="/sign-up" className="sign-up">
                {" "}Sign up
              </Link>
              <br />
              {this.state.error}
              {this.props.session.status}
            </h2>
          </StyledLog>
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
