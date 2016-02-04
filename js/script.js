var cardDown = $('.front');
var cardUp = $('.back');
var cardDownImage = "<img src=../mario-in-caphill/img/carddown.png>"
var cardsUp= [];

var availableItems = ['../mario-in-caphill/img/rsz_beer.jpg',
					'../mario-in-caphill/img/rsz_beardcomb.jpg',
					'../mario-in-caphill/img/rsz_1orca.jpg', 
					'../mario-in-caphill/img/rsz_donuts.jpg', 
					'../mario-in-caphill/img/rsz_coffee.jpg',
					'../mario-in-caphill/img/rsz_tacos.jpg'];
var combinedItems = []
var firstClick;
var secondClick;
var firstImage;
var secondImage;
var playerOneScore = 0;
var playerTwoScore = 0;
var playerTurn = 0;
var clickCounter = 0;
var matches = 0;

$(document).ready(function() {

$('.gamecard').flip( {
	trigger: "click",
	axis: "y"
});

populateBoard();

$('#new-game').click(function(e) {
	e.preventDefault();
	location.reload();
});

$('#instructions').click(function(e) {
	e.preventDefault();
	swal({
		title: "How to Play",   
		text: "After jumping into the wrong pipe tunnel, the Super Mario Bros have found themselves, trapped in the Capitol Hill neighborhood of Seattle. In order to get out of their new, ultra-hip surroundings, they must collect all the items contained in this matching memory game. First, Mario selects two cards. If the two cards match, he is awarded a point. Then, Luigi chooses which two cards to play and is awarded a point if a match occurs. This pattern continues until all the cards on the gameboard have been matched. The items to find are a local IPA, a cup of pour-over coffee, vegan tacos, a beard comb, and ORCA card, and a case of Mighty-O Donuts. Good luck!",
		type: "info",  
		closeOnConfirm: true,});
})


//Starts game and populates a new board
function populateBoard() {
	combineItems();
	shuffleItems(combinedItems);
	cardDown.html(cardDownImage);
    for (var i = 0; i < cardsUp.length; i++) {
		cardUp.each(function (i) {
		$(this).html("<img src=" + cardsUp[i] + ">");	
		});
	}

	// console.log(cardsUp);
}

//function to pull two of each item from the available items
//essentially this doubles each item in the array
function combineItems() {
	for (var i = 0; i < availableItems.length; i++) {
			combinedItems.push(availableItems[i]);
			combinedItems.push(availableItems[i]);
	}
		// console.log(combinedItems);
		return combinedItems;
}

//function to randomize the new array of items
function shuffleItems(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  cardsUp = array;
  return cardsUp;
}

//function to flip cards and determine matches
$('div.gamecard .front').click(function() {
	clickCounter++;
		if (clickCounter % 2 !== 0) {
			firstClick = $(this).siblings().html();
			firstImage = $(this);
			console.log(firstClick);
			console.log(firstImage);
		}
		else {
			secondClick = $(this).siblings().html();
			secondImage = $(this);
			playerTurn++;
				if (firstClick == secondClick) {
					firstImage.parent().flip(true);
					secondImage.parent().flip(true);
					firstImage.parent().off('.flip');
					secondImage.parent().off('.flip');
					matches++ //counter to end game when all matches have been found
					if ((playerTurn - 1) % 2 !== 0) {
						playerOneScore++;
						$('#playerTwo').text('LUIGI: ' + playerOneScore);
					}
					else {
						playerTwoScore++;
					}
					checkForWinner();//checks for winner after each match to see if game is complete
					}
				// console.log('Match!');
				else {
					setTimeout(function() {
					// console.log('Sorry, try again!');
					firstImage.parent().flip('toggle');
					secondImage.parent().flip('toggle');
					}, 1000);
			}
		}
	});

//function to check to see to compare scores between players when all matches are made
function checkForWinner() {
	if (matches == 6 && playerOneScore > playerTwoScore) {
		swal({   title: "Congratulations, Luigi!",   text: "You won the game!",   imageUrl: "../mario-in-caphill/img/luigiicon.png" });
		// console.log('Luigi you win!')
	}	
	else if (matches == 6 && playerTwoScore > playerOneScore) {
		swal({   title: "Congratulations, Mario!",   text: "You won the game!",   imageUrl: "../mario-in-caphill/img/marioicon.png" });
		console.log('Mario you win')
	}
}

});