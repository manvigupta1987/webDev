let cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];

const cards = document.querySelectorAll('.card');
let movesText = document.querySelector('.moves');
let openCards = [];
let matchCards = [];
let moves = 0;


document.addEventListener('DOMContentLoaded', function () {
    /*this function creates a card of list and add listener on each card*/
    cardList = shuffle(cardList);
    addListenerOnCards();
    document.querySelector('.fa-repeat').addEventListener('click', refresh);
});


/* Set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - Shuffle the card and create html for the card. 
 */
function addListenerOnCards() {
    let itemCount =0;
    cards.forEach(function (elem) {
        //let faIcon = elem.innerHTML;
        //cardList.push(findCardName(faIcon));
        elem.firstElementChild.className = "";
        elem.firstElementChild.className= "fa " + cardList[itemCount];
        itemCount++;
        elem.addEventListener('click', flipCard);
    });
}

function flipCard(event) {
    if (event.target.className == "card") {
        this.className += " open show";
        movesText.textContent = moves;
        openCards.push(findCardName(this.innerHTML));
        if (openCards.length === 2) {
            moves += 1;
            movesText.textContent = moves;
            setTimeout(checkIfCardsMatch, 300);
        }
    }
}

/* Function to check if cards are matched. 
 * if cards are matched, add class match and show to the card.
 * if cards are not matched, remove open and show class from the card.
 */
function checkIfCardsMatch() {
    if (openCards[0] === openCards[1]) {
        cardsMatched();
    } else {
        cardsNotMatched();
    }
    openCards = [];
}

function cardsMatched() {
    let cardName = openCards[0];
    const matchedCards = document.getElementsByClassName(cardName);
    for (let card of matchedCards) {
        card.parentElement.classList.remove("open");
        card.parentElement.classList.add("match");
    }
}

function cardsNotMatched() {
    for (let i = 0; i < openCards.length; i++) {
        let cards = document.getElementsByClassName(openCards[i]);
        for (let card of cards) {
            card.parentElement.classList.remove("open");
            card.parentElement.classList.remove("show");
        }
    }
}

function findCardName(faIcon) {
    let m = faIcon.match(/fa-.*\"/);
    if (m && m[0]) {
        m[0] = m[0].substring(0, m[0].length - 1);
        return m[0];
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function refresh(){
    moves =0;
    movesText.textContent = moves;
    resetDeck();
    cardList = shuffle(cardList);
    addListenerOnCards();
    openCards = [];
}


function resetDeck(){
    cards.forEach(function(elem){
        elem.className = "" + "card";
    });
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */