import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
	decrement = () => {
		this.props.dispatch({ type: "DECREMENT" });
	};
	increment = () => {
		this.props.dispatch({ type: "INCREMENT" });
	};
	render() {
		return (
			//wysylanie akcji do stor

			<div>
				<button onClick={this.decrement}>DECREMENT</button>
				Home page counter: {this.props.counter}
				<button onClick={this.increment}>INCREMENT</button>
			</div>
		);
	}
}
//wyjecie konkrentynch info ze stora i udostepnienie jako prop dla rendera
//map state musi wrocic obiekt
const mapStateToProps = state => {
	return {
		counter: state.counter
	};
};

export default connect(mapStateToProps)(Home);
