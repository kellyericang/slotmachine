import React, {Component} from 'react';

class Scoreboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			score: 0
		}
	}

	render() {
		return (
			<div className="scoreboard">Score: {this.props.score}</div>
		)
	}
}

export default Scoreboard;
