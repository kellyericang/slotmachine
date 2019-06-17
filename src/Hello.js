import React, {Component} from 'react';
import './Hello.css';

class Hello extends Component {
	render() {
		return (
			<div className='tc garamond'>
				<h1>doggo slot machine</h1>
				<h5>{this.props.greeting}</h5>
			</div>
		)
	}
}

export default Hello;