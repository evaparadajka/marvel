import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Button from "../user_interface/Button";
import apiClient from "../lib/api-client";
import { showNotification } from "../alert/notifications";
import StyledInput from "../user_interface/StyledInput";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordRepeat: "",
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

  updatePasswordRepeat = e => {
    this.setState({
      passwordRepeat: e.target.value
    });
  };

  isInputFormValid = () => {
    if (
      this.state.password === this.state.passwordRepeat &&
      this.state.password !== ""
    )
      return true;
    else return false;
  };

  resetForm = () => {
    this.setState({
      email: "",
      password: "",
      passwordRepeat: ""
    });
  };
  resetErrorMsg = () => {
    this.setState({
      error: ""
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.resetErrorMsg();

    if (this.isInputFormValid()) {
      apiClient
        .post("/api/v1/registrations", {
          user: {
            email: this.state.email,
            password: this.state.password
          }
        })
        .then(response => {
          this.resetForm();
          this.props.router.push("/sign-in");
        })
        .catch(error => {
          console.log(error);
          this.setState({
            error: "Something went wrong."
          });
        });
    } else {
      this.setState({
        error: "Passwords are invalid"
      });
    }
  };
  showError = () => {};

  render() {
    return (
      <div className="container-fluid background">
        <form className="form-group">
          <div className="log-style">
            <br />
            <label>Email: </label>
            <StyledInput
              onChange={this.updateEmail}
              type="email"
              value={this.state.email}
            />
            <br />
            <label>Password: </label>
            <StyledInput
              onChange={this.updatePassword}
              type="password"
              value={this.state.password}
            />
            <br />
            <label>Repeat password: </label>
            <StyledInput
              onChange={this.updatePasswordRepeat}
              type="password"
              value={this.state.passwordRepeat}
            />
            <br />
            <Button
              onClick={this.onSubmit}
              label={"Sign up"}
              className="btn-danger"
            />
            <h4>
              {this.state.error}
            </h4>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);
