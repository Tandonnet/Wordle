let toFind = "MOISI";
let keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let attempt = [];
let nextCase = 11;
let endLine = false;
let tens;
let reload = false;

window.onload = function(){
	toFind = dico[Math.floor(Math.random()*(dico.length+1)) + 1].toUpperCase();
	let duplicates1 = checkDuplicates(toFind);
	if (duplicates1.length != 0) {
		let duplicates2 = checkDuplicates(duplicates1);
		if (duplicates2.length != 0) {
			let duplicates3 = checkDuplicates(duplicates2);
		}
	}
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

document.addEventListener('keydown', (event) => {
	if (!endLine) {
		if (keys.includes(event.key)) {
			enterLetter(event.key);
		}
	} else if(event.key == 'Enter'){
		enterKey();
	} 
	if(event.key == 'Backspace') {
		removeLetter();
	}
}, false);

function enterLetter(letter) {
	document.getElementById(nextCase.toString()).innerHTML = letter.toUpperCase();
	tens = 1;
	let units = nextCase-10;
	while(units > 10){
		units -= 10;
		tens++;
	}
	if (units == 5) {
		endLine = true;
	}
	nextCase ++;
}

async function checkWord() {
	let wordGuess = [];
	let tempID = tens*10;
	for(var i = 1; i < 6; i++){ //Build word as array
		tempID += 1;
		wordGuess.push(document.getElementById(tempID.toString()).innerHTML);
	}
	if (dico.includes(wordGuess.join('').toLowerCase())) {
		let wins = 0; //Check word
		let winningChars = [];
		let score = [0,0,0,0,0];
		for (var i = 0; i < score.length; i++) { //Check for green
			if (wordGuess[i] == toFind[i]) {
				score[i] = 2;
				wins++;
				winningChars.push(toFind[i]);
			}
		}
		for (var i = 0; i < score.length; i++) { //Check for yellow
			if (score[i] == 2) {
				continue;
			} else if(toFind.includes(wordGuess[i])){
				if(!winningChars.includes(wordGuess[i])){
					score[i] = 1;
					winningChars.push(wordGuess[i]);
				}else if(duplicates3.includes(wordGuess[i])){
					score[i] = 1;
					winningChars.push(wordGuess[i]);
				}else if(duplicates2.includes(wordGuess[i])){
					score[i] = 1;
					winningChars.push(wordGuess[i]);
				}else if(duplicates1.includes(wordGuess[i]) && !checkDuplicates(winningChars).includes(wordGuess[i])){
					score[i] = 1;
					winningChars.push(wordGuess[i]);
				}
			}
		}
		for(var i = 0; i < 5; i++){
			if (score[i] == 2) {
				document.getElementById((1+i+tens*10).toString()).style.backgroundColor = "rgb(0, 176, 100)"; //Put green color
				document.getElementById(wordGuess[i]).style.backgroundColor = "rgb(0, 176, 100)";
			} else if(score[i] == 1){
				document.getElementById((1+i+tens*10).toString()).style.backgroundColor = "rgb(232, 217, 0)"; //Put yellow color
				document.getElementById(wordGuess[i]).style.backgroundColor = "rgb(232, 217, 0)";
			} else {
				document.getElementById((1+i+tens*10).toString()).style.backgroundColor = "rgb(143, 143, 139)"; // Put grey color
				document.getElementById(wordGuess[i]).style.backgroundColor = "rgb(143, 143, 139)";
			}
			await delay(0.3);
		}
		if (wins == 5) {
			reload = confirm(`Tu as gagné !\nVeux-tu rejouer?`);
		} else if(tens == 6){
			reload = confirm(`Tu as perdu, le mot était ${toFind} !\nVeux-tu rejouer?`);
		}
		reloading(reload);
	} else {
		alert(`Ce mot n'est pas dans notre dictionnaire.`);
		nextCase -= 5;
	}
}

function removeLetter() {
	if (nextCase - tens*10 > 1) {
		nextCase--;
		document.getElementById(nextCase.toString()).innerHTML = ' ';
		endLine = false;
	}
}

function checkDuplicates(arr) {
	let duplicates = [];
	const tempArray = [...arr].sort();
	for(var i = 0; i < tempArray.length ; i++){
		if (tempArray[i+1] == tempArray[i]) {
			duplicates.push(tempArray[i]);
		}
	}
	return duplicates;
}

function enterKey() {
	checkWord();
	nextCase += 5;
	endLine = false;
}

function reloading(reload) {
	if (reload) {
		reload = false;
		location.reload();
	}
}