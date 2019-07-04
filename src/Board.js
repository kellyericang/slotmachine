import React, {Component} from 'react';
import Scoreboard from './Scoreboard';
import './Board.css';
import Cards from './Cards';

const   reel0 = [10,9,2,4,8,5,7,9,4,6,3,8,5,9,1,3,6,7,5,0,8,9,2,7,5,10,6,8,4,3,1,6],
		reel1 = [9,3,1,4,7,9,2,6,8,1,4,9,2,0,6,5,7,8,4,3,10,9,6,7,8,5,3,9,1,2,7,8],
		reel2 = [2,6,5,10,7,9,6,2,4,8,1,3,6,9,7,4,5,8,9,3,2,4,8,7,5,0,3,8,6,7,9,1],
		reel3 = [2,7,0,10,6,8,7,4,1,5,8,9,4,7,6,2,9,8,3,4,7,5,6,3,8,9,5,2,4,1,9,8],
		reel4 = [8,10,1,2,7,4,6,8,3,7,4,2,6,1,9,5,4,2,0,6,3,9,5,2,8,6,1,9,4,5,7,3];

const reels = [reel0, reel1, reel2, reel3, reel4];


class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			score: 10000,
			boardState: [10,9,2,2,8,9,3,6,7,10,2,1,5,0,1],
		}
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

		let i=0, lineWin=0, totalWin=0, winningCardsArray=[];
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
		if(totalWin !== 0)	this.addScore(totalWin);
		return winningStateArray(winningCardsArray);
	}

	addScore(i) {
		console.log("score added:", i);
		this.setState({
			score: this.state.score + i
		})
	}

	renderScoreboard(){
		return (
			<Scoreboard score={this.state.score} />
		);
	}

	setNewBoardState(){
		this.setState({
			boardState: newBoardState()
		});
	}

	renderCards() {
		let cards = this.checkWin();
		return (
			<Cards boardState={this.state.boardState} winningCards={cards}/>
		);
	}

	spin() {
		this.addScore(-1);
		this.renderScoreboard();
		this.setNewBoardState();
		this.renderCards();
		// this.renderScoreboard();
	}

	render() {
		// console.log("current state:", this.state.boardState);
		return (
			<div className="board">
				<h1 className='tc garamond'>doggo slot machine</h1>

				<Scoreboard score={this.state.score}/>
				<Cards boardState={this.state.boardState} winningCards={this.checkWin}/>

				<button className='startGameButton' 
					onClick={() => {
					document.querySelector(".startGameButton").style.display = "none";
					document.querySelector(".spinButton").style.display="inline";
					document.querySelector(".scoreboard").style.display="inline";
					document.querySelector(".cards").style.display = "grid";
					}}>
					START GAME
				</button>

				<button className='spinButton' onClick={() => {
					this.spin()
				}}>
				spin!
				</button>
			</div>
		)
	}
}

export default Board;


function newBoardState() {
	let newState = [];
	let i, x, column = 1;
	for(i=0; i<5; i++){
		x = Math.floor(Math.random()*32);
		newState[column - 1] = reels[i][getPreviousReel(x)];
		newState[column] = reels[i][x];
		newState[column + 1] = reels[i][getNextReel(x)];
		column += 3;
	}

	return newState;
}

function getPreviousReel(i){
	if(i === 0) {
		return 31; 
	} else {
		return i - 1;
	}
}

function getNextReel(i){
	if(i === 31) {
		return 0; 
	} else {
		return i + 1;
	}
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
// function turnRed(i) {
// 	ReactDOM.document.getElementById(i).style.background-color="linear-gradient(62deg, rgba(55,1,1,1) 0%, rgba(221,38,114,1) 50%, rgba(212,21,21,1) 100%)";
// }