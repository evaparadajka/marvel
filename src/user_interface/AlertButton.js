import React from "react";
import Button from "./Button";

class AlertButton extends React.Component {
	showAlert = () => {
		alert("zostalem klikniety");
		this.prop.onClick();
	};
	render() {
		return <Button {...this.props} onClick={this.showAlert} />;
	}
}

export default AlertButton;
