import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Button from "../user_interface/Button";
import apiClient from "../lib/api-client";

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
          //dane z naszego formularza w postaci obiektu
          //axios post zwraca promise
          user: {
            email: this.state.email,
            password: this.state.password
          }
        })
        .then(response => {
          // this.props.dispatch({
          //   type: "REGISTER",
          //   data: {
          //     email: this.state.email,
          //     password: this.state.password,
          //     passwordRepeat: this.state.passwordRepeat
          //   }
          // });
          this.setState({
            email: "",
            password: "",
            passwordRepeat: ""
          });

          this.props.router.push("posts");
        })
        .catch(error => {
          console.log(error);
          this.setState({
            error: "Coś poszło nie tak"
          });
        });
      this.setState({
        error: ""
      });
    } else {
      this.setState({
        error: "Różne hasła"
      });
    }
  };
  showError = () => {};

  render() {
    return (
      <div className="text-center">
        <form className="form-group">
          <label>Email: </label>
          <input
            className="form-control"
            onChange={this.updateEmail}
            type="email"
            value={this.state.email}
          />

          <label>Password: </label>
          <input
            className="form-control"
            onChange={this.updatePassword}
            type="password"
            value={this.state.password}
          />
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
          <h2>
            {this.state.error}
          </h2>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(withRouter(SignUp));
