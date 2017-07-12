import React from "react";

class Button extends React.Component {
	render() {
		return (
			<button
				style={{ border: "none" }}
				onClick={this.props.onClick}
				className={`btn ${this.props.className}`}
			>
				{this.props.label}
			</button>
		);
	}
}

export default Button;
