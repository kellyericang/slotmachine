import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';
import * as serviceWorker from './serviceWorker';
import 'tachyons';

ReactDOM.render(
	<div>
		<Board />
	</div>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


/*** 

grab 15 dogs from the online api database 
have a set pattern for the reels 
each spin, rng 5 numbers (one for each reel) 
each rng number is the middle one for that reel 
make above and below +- 1 
generate the cards 

board
0 3 6 9  12
1 4 7 10 13
2 5 8 11 14

***/