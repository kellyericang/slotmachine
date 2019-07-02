import React, {Component} from 'react';
import 'tachyons';
import './Card.css';
// import { CSSTransition } from 'react-transition-group'

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			doggo: "",
			breed: "",
			win: "",
			id: ""
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
		// console.log(this.props)

		// this.setState({
		// 	win: this.props.win
		// });

		let style; 
		if(!this.state.win){
			style = "background-color: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)";
		} else {
			style = "background-color: linear-gradient(62deg, rgba(55,1,1,1) 0%, rgba(221,38,114,1) 50%, rgba(212,21,21,1) 100%)";
		}
		// console.log("id: ", this.props.id, "win: ", this.props.win);
		return (
			<div className="card w-20" id={this.props.id} style={{style}}>
				<img alt="" src={this.props.doggo}/>
				<p>
					breed: {this.props.breed}<br/>
					win: {this.props.win}
				</p>
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
