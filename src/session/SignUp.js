import React from "react";
import { withRouter } from "react-router";
import Button from "../user_interface/Button";
import apiClient from "../lib/api-client";
import StyledInput from "../user_interface/StyledInput";
import { error, success } from "react-notification-system-redux";
import {
  notificationRegistrationCompleted,
  notificationUnexpectedErrorOccurred,
  notificationInvalidPasswords
} from "../alert/notifications";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordRepeat: "",
      error: false,
      isSubmit: false
    };
  }

  showNotification = message => {
    this.context.store.dispatch(message);
  };

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
      this.state.password !== "" &&
      this.state.password.length >= 8
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
      error: false
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.resetErrorMsg();
    this.setState({
      isSubmit: true
    });
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
          this.showNotification(success(notificationRegistrationCompleted));
          this.props.router.push("/sign-in");
        })
        .catch(errorL => {
          console.log(errorL);
          this.showNotification(error(notificationUnexpectedErrorOccurred));
          this.setState({
            error: true
          });
        });
    } else {
      this.showNotification(error(notificationInvalidPasswords));
      this.setState({
        error: true
      });
    }
  };

  loading = () => {
    if (this.state.error === true && this.state.isSubmit === true) {
      this.setState({
        isSubmit: false
      });
    }
    if (this.state.isSubmit) {
      return (
        <div className="spin">
          <ReactLoading
            type="spin"
            color="#a91c1c"
            height="34px"
            width="34px"
            delay="0"
          />
        </div>
      );
    } else {
      return (
        <Button
          onClick={this.onSubmit}
          label={"Sign up"}
          className="btn-danger"
        />
      );
    }
  };

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
            {this.loading()}
          </div>
        </form>
      </div>
    );
  }
}

SignUp.contextTypes = {
  store: PropTypes.object
};

export default withRouter(SignUp);
