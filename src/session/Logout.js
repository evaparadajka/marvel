import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import ReactConfirmAlert, { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { withRouter } from "react-router";

class Logout extends React.Component {
  logout = () => {
    this.props.router.push("/sign-in/");
    this.props.dispatch({
      type: "LOGOUT"
    });
  };

  submit = () => {
    confirmAlert({
      title: "Confirm logout",
      message: "Are you sure you want to logout?.",
      confirmLabel: "Yes",
      cancelLabel: "No",
      onConfirm: () => this.logout(),
      onCancel: () => {}
    });
  };

  render() {
    return (
      <li>
        <Link onClick={this.submit} className="nav-style">
          <i className="fa fa-sign-out" />
        </Link>
      </li>
    );
  }
}

export default connect()(withRouter(Logout));
