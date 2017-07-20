import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Button from "../user_interface/Button";
import { signIn } from "./session-actions";
import { Link } from "react-router";
import StyledLog from "../user_interface/StyledLog";
import { showNotification } from "../alert/notifications";
import StyledInput from "../user_interface/StyledInput";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  updateEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  updatePassword = e => {
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
        <form className="form-group ">
          <div className="log-style">
            <br />
            <label>Email: </label>
            <StyledInput
              onChange={this.updateEmail}
              type="email"
              value={this.state.email}
            />

            <label>Password: </label>
            <StyledInput
              onChange={this.updatePassword}
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
              <Link to="/sign-up" className="sign-up">
                or sign up!
              </Link>
              <br />
              {this.state.error}
            </h2>
            <h4>
              {this.props.session.status}
            </h4>
          </div>
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
