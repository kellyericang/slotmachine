import React, {useState, useEffect} from 'react';
import './Board.css';
import {Cards} from './Cards';

function Board() {

	const [score, setScore] = useState(10000);
	const [boardState, setBoardState] = useState([10,9,2,2,8,9,3,6,7,10,2,1,5,0,1]);
	const [win, setWin] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
	const [cardsProps, setCardsProps] = useState({
		boardState: {boardState},
		winningCards: {win}
	});

	const   reel0 = [10,9,2,4,8,5,7,9,4,6,3,8,5,9,1,3,6,7,5,0,8,9,2,7,5,10,6,8,4,3,1,6],
			reel1 = [9,3,1,4,7,9,2,6,8,1,4,9,2,0,6,5,7,8,4,3,10,9,6,7,8,5,3,9,1,2,7,8],
			reel2 = [2,6,5,10,7,9,6,2,4,8,1,3,6,9,7,4,5,8,9,3,2,4,8,7,5,0,3,8,6,7,9,1],
			reel3 = [2,7,0,10,6,8,7,4,1,5,8,9,4,7,6,2,9,8,3,4,7,5,6,3,8,9,5,2,4,1,9,8],
			reel4 = [8,10,1,2,7,4,6,8,3,7,4,2,6,1,9,5,4,2,0,6,3,9,5,2,8,6,1,9,4,5,7,3];

	const reels = [reel0, reel1, reel2, reel3, reel4];

	// checks current board for winning lines, 
	function checkWin(board){
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
		let currentState = board.slice(0);
		for(i=0; i<15; i++) {
			if (board[winningLines[i][0]] !== board[winningLines[i][1]]) continue;
			else if (board[winningLines[i][1]] !== board[winningLines[i][2]]) continue; 
			else {
				lineWin = 5;
				winningCardsArray.push(winningLines[i][0], winningLines[i][1], winningLines[i][2])
				if (board[winningLines[i][0]] === board[winningLines[i][3]]) {
					lineWin = 10;
					winningCardsArray.push(winningLines[i][4]);
					if (board[winningLines[i][0]] === board[winningLines[i][4]]) {
						lineWin = 15;	
						winningCardsArray.push(winningLines[i][5]);
					}
				}
			}
			if(lineWin !== 0) console.log(`won ${lineWin} on line ${i}`)
			totalWin = totalWin + lineWin;
			lineWin = 0;
		}
		if(totalWin !== 0){
			setScore(score + totalWin);
			// console.log(winningStateArray(winningCardsArray));
		}
		// setWin(winningStateArray(winningCardsArray));
		return winningStateArray(winningCardsArray);
	}

	function spin() {
		setScore(score-1);
		setBoardState(newBoardState());
		setWin(checkWin(boardState));
		setCardsProps({boardState: {boardState}, winningCards: {win}});
	}

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

	function winningStateArray(arr) {
		let newArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(let num of arr)	newArray[num] = 1
		return newArray;
	}

	function resetWinningStateArray(){
		return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	}

	useEffect(() => {
		// setWin(checkWin(boardState));
		// setCardsProps({boardState: {boardState}, winningCards: {win}});
	}, boardState);

	return (
		<div className="board">
			<h2>doggo slot machine</h2>
			<h4 className="intro">This is a game I made for fun to apply some of the stuff I learned in React. Enjoy!</h4>
			<div className="scoreboard f4 courier br-pill"> SCORE: {score}</div>
			<Cards {...cardsProps}/>

			<button className='startGameButton' 
				onClick={() => {
				document.querySelector(".startGameButton").style.display = "none";
				document.querySelector(".spinButton").style.display="inline";
				document.querySelector(".scoreboard").style.display="inline";
				document.querySelector(".cards").style.display = "grid";
				document.querySelector(".intro").style.display = "none";
				}}>
				START GAME
			</button>

			<button className='spinButton' onClick={() => {
				spin()
			}}>
			spin!
			</button>
		</div>
	)

}

export default Board;
