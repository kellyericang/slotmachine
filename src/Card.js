import React, {Component} from 'react';
import 'tachyons';
import './Card.css';

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			doggo: "",
			breed: ""
		}
	}

	async componentDidMount() {
		const response = await fetch('https://dog.ceo/api/breeds/image/random');
		const obj = await response.json(); 

		this.setState({ 
			doggo: obj.message,
			breed: getBreed(obj.message)
		});
		// console.log(`[${this.state.breed}]  state:`, this.state);

	}

	render() {
		// const {doggo, breed} = this.state;
		return (
			<div className="card w-20 bw0">
				<img alt="" src={this.props.doggo}/>
				<p>{this.props.breed}</p>
			</div>
		)
	}
}

export default Card;

function getBreed(url) {
	let breed = url.substring(30, url.lastIndexOf("/"));

	//removing hyphen and swapping words
	if(breed.search("-") < 0) {
		// console.log(`[${breed}]  not swapping`);
		return breed;
	} else {
		// console.log(`[${breed}]  swapping words`);
		let hyphen = breed.indexOf("-");
		return breed.substring(hyphen+1) + " " + breed.substring(0,hyphen);
	}
}
