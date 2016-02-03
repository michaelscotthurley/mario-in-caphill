var cardDown = $('.front');
var cardUp = $('.back');
var cardDownImage = "<img src=../mario-in-caphill/img/carddown.png>"
var cardsUp=[];

var availableItems = [{item: 'beer', imageLink: '../mario-in-caphill/img/rsz_beer.jpg'}, 
					{item: 'beardcomb', imageLink: '../mario-in-caphill/img/rsz_beardcomb.jpg'},
					{item: 'orca', imageLink: '../mario-in-caphill/img/rsz_1orca.jpg'}, 
					{item: 'donuts', imageLink:	'../mario-in-caphill/img/rsz_donuts.jpg'}, 
					{item: 'coffee'	, imageLink: '../mario-in-caphill/img/rsz_coffee.jpg'},
					{item: 'tacos', imageLink:	'../mario-in-caphill/img/rsz_tacos.jpg'}];
var combinedItems=[]
var firstCard = [];
var secondCard = [];
var playerTurn=1;
var flipCounter = 0;

$(document).ready(function() {

$('#start-game').click(function() {
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
			combinedItems.push(availableItems[i].imageLink);
			combinedItems.push(availableItems[i].imageLink);
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

$('.gamecard').flip( {
	trigger: "click",
	axis: "y"
});

});
