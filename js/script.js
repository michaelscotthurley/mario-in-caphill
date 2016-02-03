var cardDown = $('.front');
var cardUp = $('.back');
var cardDownImage = "<img src=../mario-in-caphill/img/carddown.png>"
var cardsUp=[];

var availableItems = ['../mario-in-caphill/img/rsz_beer.jpg',
					'../mario-in-caphill/img/rsz_beardcomb.jpg',
					'../mario-in-caphill/img/rsz_1orca.jpg', 
					'../mario-in-caphill/img/rsz_donuts.jpg', 
					'../mario-in-caphill/img/rsz_coffee.jpg',
					'../mario-in-caphill/img/rsz_tacos.jpg'];
var combinedItems=[]
var firstClick;
var secondClick;
var firstImage;
var secondImage;
var playerTurn=1;
var clickCounter=0;

$(document).ready(function() {

$('.gamecard').flip( {
	trigger: "click",
	axis: "y"
});

populateBoard();

$('#start-game').click(function() {
	combinedItems=[];
	cardsUp=[];
	populateBoard();
});


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

	console.log(cardsUp);
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
	clickCounter++
	if (clickCounter % 2 !== 0) {
		firstClick = $(this).siblings().html();
		firstImage = $(this);
		console.log(firstClick);
		console.log(firstImage);
	}
	else {
		secondClick = $(this).siblings().html();
		secondImage = $(this);
		console.log(secondClick);
		console.log(secondImage);
			if (firstClick == secondClick) {
				firstImage.parent().flip(true);
				secondImage.parent().flip(true);
				firstImage.parent().off('.flip');
				secondImage.parent().off('.flip');
			//add a sweet alert for matches
			console.log('Match!');
		}
			else {
				setTimeout(function() {
				console.log('Sorry, try again!');
				firstImage.parent().flip('toggle');
				secondImage.parent().flip('toggle');
				}, 1000);
		}
	}
	})
});
