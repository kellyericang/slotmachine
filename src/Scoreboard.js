import React, {Component} from 'react';

class Scoreboard extends Component {
	render() {
		return (
			<div className="scoreboard f4 courier br-pill"> SCORE: {this.props.score}</div>
		)
	}
}

export default Scoreboard;
