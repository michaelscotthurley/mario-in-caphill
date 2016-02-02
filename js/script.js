var cardDown = $('.front');
var cardUp = $('.back');
var cardDownImage = "<img src=../mario-in-caphill/img/carddown.png>"
var playerOne = "Mario";
var playerTwo = "Luigi";

var availableItems = ['../mario-in-caphill/img/rsz_beer.jpg', 
					'../mario-in-caphill/img/rsz_beardcomb.jpg',
					'../mario-in-caphill/img/rsz_1orca.jpg', 
					'../mario-in-caphill/img/rsz_donuts.jpg', 
					'../mario-in-caphill/img/rsz_coffee.jpg',
					'../mario-in-caphill/img/rsz_tacos.jpg'];
var combinedItems=[]
var randomItems=[];
var playerOneItems=[];
var playerTwoItems=[];
var playerTurn=1;

$(document).ready(function() {

combineItems();
shuffleItems(combinedItems);

$('#start-game').click(function() {
	populateBoard();
});

$('#play-again').click(function() {
	clearBoard();
});

function populateBoard() {
    cardDown.html(cardDownImage);
    for (var i = 0; i < randomItems.length; i++)
		cardUp.each(function (i) {
		$(this).html("<img src=" + randomItems[i] + ">");	
		});
	playerSelection();
}

function clearBoard() {
	cardDown.html("");
	cardUp.html("");
}


//function to pull two of each item from the available items
function combineItems() {
	for (var i = 0; i < availableItems.length; i++) {
			combinedItems.push(availableItems[i]);
			combinedItems.push(availableItems[i]);
	}
		// console.log(combinedItems);
		return combinedItems;
}

//function to randomize combined array contents
function shuffleItems(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  randomItems = array;
  return randomItems;
}

function playerSelection() {
	for (var i = 0; i < randomItems.length; i++) {
		var flipCount = 0;
		while (flipCount < 2) {
			randomItems[i].click(function() {
				randomItems[i].flip();
				flipCount++
			});
		}
	}
}


});
