import React, {useState, useEffect} from 'react';

function Card(props){

	let classname = props.win ? "card winner" : "card";

	return (
		<div className={classname} id={props.id}>
			<img className="dogImage" alt="" src={props.doggo}/>
		</div>
	)
}

function Cards(props) {

	const [urlArray, setUrlArray] = useState({urls: [] });
	// const [breedArray, setBreedArray] = useState({breeds: [] });
	// const [winningCards, setWinningCards] = useState( props.winningCards );

	// card initialization
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://dog.ceo/api/breeds/image/random/11');
			const obj = await response.json(); 

			const urls = obj.message;
			// const urls2 = obj.message.slice(0);

			setUrlArray(urls);
			// setBreedArray(urls2);
		};
		fetchData();
	}, []);

	// function updateWinningCardsState(arr) {
	// 	setWinningCards(arr);
	// }

	// function addBreeds(breeds) {
	// 	for(let i=0; i<breeds.length; i++) {
	// 		let breed = breeds[i].substring(30, breeds[i].lastIndexOf("/"));

	// 		//removing hyphen and swapping words
	// 		if(breed.search("-") < 0) {
	// 			breeds[i] = breed;
	// 		} else {
	// 			let hyphen = breed.indexOf("-");
	// 			breeds[i] = breed.substring(hyphen+1) + " " + breed.substring(0,hyphen);
	// 		}	
	// 	}
	// 	return breeds;
	// }


	// function getBreed(url) {
	// 	let breed = url.substring(30, url.lastIndexOf("/"));

	// 	//removing hyphen and swapping words
	// 	if(breed.search("-") < 0) {
	// 		// console.log(`[${breed}]  not swapping`);
	// 		return breed;
	// 	} else {
	// 		// console.log(`[${breed}]  swapping words`);
	// 		let hyphen = breed.indexOf("-");
	// 		return breed.substring(hyphen+1) + " " + breed.substring(0,hyphen);
	// 	}
	// }

	let x = props.boardState.boardState;

	let cardProp = [];
	for(let i=0; i<15; i++){
		let y = {
			breed: x[i],
			doggo: urlArray[x[i]],
			win: props.winningCards.win[i],
			id: i
		}
		cardProp.push(y);
	}

	return (
		<div className="cards">
			<Card {...cardProp[0]} />
			<Card {...cardProp[3]} />
			<Card {...cardProp[6]} />
			<Card {...cardProp[9]} />
	    	<Card {...cardProp[12]} />

	    	<Card {...cardProp[1]} />
	    	<Card {...cardProp[4]} />
	    	<Card {...cardProp[7]} />
	    	<Card {...cardProp[10]} />
	    	<Card {...cardProp[13]} />

	    	<Card {...cardProp[2]} />
	    	<Card {...cardProp[5]} />
	    	<Card {...cardProp[8]} />
	    	<Card {...cardProp[11]} />
	    	<Card {...cardProp[14]} />
    	</div>
	);	
}

export {Card, Cards};



