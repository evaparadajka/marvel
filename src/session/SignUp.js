import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Button from "../user_interface/Button";
import apiClient from "../lib/api-client";
import StyledLog from "../user_interface/StyledLog";

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

  onSubmit = e => {
    e.preventDefault();

    if (
      this.state.password === this.state.passwordRepeat &&
      this.state.password !== ""
    ) {
      apiClient
        .post("/api/v1/registrations", {
          user: {
            email: this.state.email,
            password: this.state.password
          }
        })
        .then(response => {
          this.setState({
            email: "",
            password: "",
            passwordRepeat: ""
          });
          this.props.router.push("/sign-in");
        })
        .catch(error => {
          console.log(error);
          this.setState({
            error: "Something went wrong."
          });
        });
      this.setState({
        error: ""
      });
    } else {
      this.setState({
        error: "Passwords are not the same"
      });
    }
  };
  showError = () => {};

  render() {
    return (
      <div className="container-fluid background">
        <form className="form-group">
          <StyledLog className="log-style">
            <br />
            <label>Email: </label>
            <input
              className="form-control"
              onChange={this.updateEmail}
              type="email"
              value={this.state.email}
            />
            <br />
            <label>Password: </label>
            <input
              className="form-control"
              onChange={this.updatePassword}
              type="password"
              value={this.state.password}
            />
            <br />
            <label>Repeat password: </label>
            <input
              className="form-control"
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
          </StyledLog>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {};
// };

export default withRouter(SignUp);
