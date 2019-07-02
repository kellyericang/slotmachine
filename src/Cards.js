import React, {Component} from 'react';
import Card from './Card';

const   reel0 = [10,9,2,4,8,5,7,9,4,6,3,8,5,9,1,3,6,7,5,0,8,9,2,7,5,10,6,8,4,3,1,6],
		reel1 = [9,3,1,4,7,9,2,6,8,1,4,9,2,0,6,5,7,8,4,3,10,9,6,7,8,5,3,9,1,2,7,8],
		reel2 = [2,6,5,10,7,9,6,2,4,8,1,3,6,9,7,4,5,8,9,3,2,4,8,7,5,0,3,8,6,7,9,1],
		reel3 = [2,7,0,10,6,8,7,4,1,5,8,9,4,7,6,2,9,8,3,4,7,5,6,3,8,9,5,2,4,1,9,8],
		reel4 = [8,10,1,2,7,4,6,8,3,7,4,2,6,1,9,5,4,2,0,6,3,9,5,2,8,6,1,9,4,5,7,3];

const reels = [reel0, reel1, reel2, reel3, reel4];

class Cards extends Component {
	constructor(props) {
		super(props);
		this.state = {
			urlArray: [],
			breedArray: [],
			winningCards: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		}
	}

	async componentDidMount() {
		const response = await fetch('https://dog.ceo/api/breeds/image/random/11');
		const obj = await response.json(); 

		const urls = obj.message;
		const urls2 = obj.message.slice(0);

		this.setState({
			urlArray: urls,
			breedArray: addBreeds(urls2)
		});
	}


	checkWin(){
		const winningLines = [
			[1,4,7,10,13],
			[0,3,6,9,12],
			[2,5,8,11,14],
			[0,4,8,10,12],
			[2,4,6,10,14],
			[2,5,7,9,12],
			[0,3,7,11,14],
			[1,5,7,9,13],
			[1,3,7,11,13],
			[2,4,7,10,12],
			[0,4,7,10,14],
			[1,5,8,10,12],
			[1,3,6,10,14],
			[1,4,8,10,12],
			[1,4,6,10,14]
		]
		let i=0, lineWin=0, totalWin=0, winningCardsArray=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		let currentState = this.state.boardState.slice(0);
		for(i=0; i<15; i++) {
			if (currentState[winningLines[i][0]] !== currentState[winningLines[i][1]]) continue;
			else if (currentState[winningLines[i][1]] !== currentState[winningLines[i][2]]) continue; 
			else {
				lineWin = 5;
				winningCardsArray.push(winningLines[i][0], winningLines[i][1], winningLines[i][2])
				if (currentState[winningLines[i][0]] === currentState[winningLines[i][3]]) {
					lineWin = 10;
					winningCardsArray.push(winningLines[i][4]);
					if (currentState[winningLines[i][0]] === currentState[winningLines[i][4]]) {
						lineWin = 15;	
						winningCardsArray.push(winningLines[i][5]);
					}
				}
			}
			if(lineWin !== 0) console.log(`won ${lineWin} on line ${i}`)
			totalWin = totalWin + lineWin;
			lineWin = 0;
		}

		if (totalWin !== 0) {
			this.addScore(totalWin);
			console.log("setting winning state array:",winningStateArray(winningCardsArray));
			this.setState({ winningCards: winningStateArray(winningCardsArray) });
			
			// sleep(1000);
			
			console.log("state",this.state.winningCards);
			this.renderCards();
			this.setState({ winningCards: resetWinningStateArray(winningCardsArray) });
			this.renderCards();
		}
	}

	renderCard(i) {
		let x = this.state.boardState[i];
		let win = false;
		console.log("card:", i, "win: ", win)
	    return (
	      <Card 
	        // breed={this.state.breedArray[x]}
	        breed={x}
	        doggo={this.state.urlArray[x]}
	        win={this.state.winningCards[i]}
	        id={i}
	      />
	    );
	}

	render() {
		let x = this.props.boardState;
		return (
			<div className="cards">
				<Card breed={x[0]} doggo={this.state.urlArray[x[0]]} win={this.state.winningCards[0]} id={0} />
				<Card breed={x[3]} doggo={this.state.urlArray[x[3]]} win={this.state.winningCards[3]} id={3} />
				<Card breed={x[6]} doggo={this.state.urlArray[x[6]]} win={this.state.winningCards[6]} id={6} />
				<Card breed={x[9]} doggo={this.state.urlArray[x[9]]} win={this.state.winningCards[9]} id={9} />
		    	<Card breed={x[12]} doggo={this.state.urlArray[x[12]]} win={this.state.winningCards[12]} id={12} />

		    	<Card breed={x[1]} doggo={this.state.urlArray[x[1]]} win={this.state.winningCards[1]} id={1} />
		    	<Card breed={x[4]} doggo={this.state.urlArray[x[4]]} win={this.state.winningCards[4]} id={4} />
		    	<Card breed={x[7]} doggo={this.state.urlArray[x[7]]} win={this.state.winningCards[7]} id={7} />
		    	<Card breed={x[10]} doggo={this.state.urlArray[x[10]]} win={this.state.winningCards[10]} id={10} />
		    	<Card breed={x[13]} doggo={this.state.urlArray[x[13]]} win={this.state.winningCards[13]} id={13} />

		    	<Card breed={x[2]} doggo={this.state.urlArray[x[2]]} win={this.state.winningCards[2]} id={2} />
		    	<Card breed={x[5]} doggo={this.state.urlArray[x[5]]} win={this.state.winningCards[5]} id={5} />
		    	<Card breed={x[8]} doggo={this.state.urlArray[x[8]]} win={this.state.winningCards[8]} id={8} />
		    	<Card breed={x[11]} doggo={this.state.urlArray[x[11]]} win={this.state.winningCards[11]} id={11} />
		    	<Card breed={x[14]} doggo={this.state.urlArray[x[14]]} win={this.state.winningCards[14]} id={14} />
	    	</div>
		);		
	}
}

export default Cards;

function addBreeds(breeds) {
	for(let i=0; i<breeds.length; i++) {
		let breed = breeds[i].substring(30, breeds[i].lastIndexOf("/"));

		//removing hyphen and swapping words
		if(breed.search("-") < 0) {
			breeds[i] = breed;
		} else {
			let hyphen = breed.indexOf("-");
			breeds[i] = breed.substring(hyphen+1) + " " + breed.substring(0,hyphen);
		}
		
	}
	return breeds;
}



function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function winningStateArray(arr) {
	let newArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	for(let num of arr)	newArray[num] = 1
	return newArray;
}

function resetWinningStateArray(){
	return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}