import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Button from "../user_interface/Button";
import { signIn } from "./session-actions";
import { Link } from "react-router";
import StyledInput from "../user_interface/StyledInput";
import ReactLoading from "react-loading";
import Notifications, { error } from "react-notification-system-redux";
import { notificationLoginFailed } from "../alert/notifications";
import PropTypes from "prop-types";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      isSubmit: true
    });
    this.props.dispatch(
      signIn({
        email: this.state.email,
        password: this.state.password
      })
    );
  };

  loading = () => {
    if (
      this.props.session.status === "Login failed" &&
      this.state.isSubmit === true
    ) {
      this.showNotification(error(notificationLoginFailed));
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
          label={"Sign in"}
          className="btn-danger"
        />
      );
    }
  };

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
            {this.loading()}
            <h2>
              <Link to="/sign-up" className="sign-up">
                or sign up!
              </Link>
              <br />
            </h2>
          </div>
        </form>
      </div>
    );
  }
}

SignIn.contextTypes = {
  store: PropTypes.object
};

const mapStateToProps = state => {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(withRouter(SignIn));
