let cardList = [
    "fa-diamond", 
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-anchor",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-bomb",
    "fa-leaf",
    "fa-bomb",
    "fa-bolt",
    "fa-bicycle",
    "fa-paper-plane-o",
    "fa-cube"
];

const cards = document.querySelectorAll('.card'),
      GAME_FINISHED_COUNTER = 8,
      MAX_MOVES = 30;

let movesText = document.querySelector('.moves'),
    openCards = [],
    isGameStarted = false,
    MOVES_TO_LOOSE_STAR = 5,
    NUMBER_OF_STARS = 3,
    CARD_TO_LOOSE_STAR = 1;

let movesCount = countTimer = timerPtr = matchedCardCounter = 0;


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
    let itemCount = 0;
    cards.forEach(function (elem) {
        //let faIcon = elem.innerHTML;
        //cardList.push(findCardName(faIcon));
        elem.firstElementChild.className = "";
        elem.firstElementChild.className = "fa " + cardList[itemCount];
        itemCount++;
        elem.addEventListener('click', cardClicked);
    });
}

/*Called when card is clicked, It checks if open cards are matched, increase moves, updates stars and 
 * also checks if user won the game*/

function cardClicked(event) {
    if (event.target.className == "card") {
        if (!isGameStarted) {
            isGameStarted = true;
            countTimer = 0;
            timerPtr = setTimeout(startTimer, 1000);
        }
        openCards.push(this);
        this.className += " open show";
        if (openCards.length === 2) {
            movesCount += 1;
            let isCardMatch = checkIfCardsMatch();
            updateMoves();
            loseStar();
            if (isCardMatch) {
                checkIfGameFinished();
            }
            openCards = [];
        }
    }
}

/* if all cards have matched, display a modal with winning message, final score, rating. 
 * Also provides two buttons Close and Play Again. If user clicks on Play Again, it starts the game again.
 */

function checkIfGameFinished() {
    if (matchedCardCounter === GAME_FINISHED_COUNTER) {
        clearTimeout(timerPtr);
        swal({
                closeOnEsc: false,
                closeOnClickOutside: false,
                title: "Congratulations! You Won!",
                text: `With ${movesCount} Moves and ${NUMBER_OF_STARS} Stars in ${countTimer} Seconds.`,
                icon: "success",
                buttons: {
                    cancel: "Close",
                    success: {
                        text: "Play Again!",
                        value: true,
                        closeModal: true,
                    },
                },
            })
            .then(function (value) {
                value ? refresh() : clearTimeout(timerPtr);
            });
        openCards = [];
    }
}

/*Function to start the timer. */
function startTimer() {
    countTimer += 1;
    document.querySelector('.timer').textContent = countTimer;
    timerPtr = setTimeout(startTimer, 1000);
}

function getClassName(card) {
    return (card.firstElementChild.className);

}
/* Function to check if cards are matched. 
 * if cards are matched, add class match and show to the card.
 * if cards are not matched, remove open and show class from the card.
 */
function checkIfCardsMatch() {
    if (getClassName(openCards[0]) === getClassName(openCards[1])) {
        matchedCardCounter++;
        cardsMatched();
        return true;
    } else {
        cardsNotMatched();
        return false;
    }
}

function cardsMatched() {
    openCards.forEach(function (card) {
        card.className = "card match";
    });
}

function cardsNotMatched() {
    openCards.forEach(function (card) {
        card.className += " notMatch";
    });
    setTimeout(resetClass, 500);
}

function resetClass() {
    document.querySelectorAll(".notMatch").forEach(function (elem) {
        elem.className = "card";
    });
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

function updateMoves() {
    movesText.textContent = movesCount;
}

/*Critera for getting 3 star rating:
 *5 moves, 1 match
 *10 moves, 3 match
 *15 moves, 5 match
 *20 moves, 7 match
 *25 moves, 8 match
 */
function loseStar() {
    if (movesCount === MOVES_TO_LOOSE_STAR && MOVES_TO_LOOSE_STAR <= MAX_MOVES) {
        if (matchedCardCounter < CARD_TO_LOOSE_STAR && NUMBER_OF_STARS > 1) {
            let starIcon = document.querySelector('.fa-star-half-o');
            if (starIcon) {
                starIcon.className = "fa fa-star-o";
            } else {
                let starsIcon = document.querySelectorAll('.fa-star');
                starIcon = starsIcon[starsIcon.length - 1];
                starIcon.className = "fa fa-star-half-o";
            }
            NUMBER_OF_STARS = NUMBER_OF_STARS - 0.5;
        }
        MOVES_TO_LOOSE_STAR += 5;
        if ((CARD_TO_LOOSE_STAR + 2) < 8) {
            CARD_TO_LOOSE_STAR = CARD_TO_LOOSE_STAR + 2;
        } else {
            CARD_TO_LOOSE_STAR = 8;
        }
    }
}

function refresh() {
    isGameStarted = false;
    resetCounters();
    updateMoves();
    resetTimer();
    resetDeck();
    cardList = shuffle(cardList);
    addListenerOnCards();
    resetStars();
    openCards = [];
}

function resetCounters() {
    movesCount = 0;
    MOVES_TO_LOOSE_STAR = 5;
    NUMBER_OF_STARS = 3;
    CARD_TO_LOOSE_STAR = 1;
    matchedCardCounter = 0;
}

function resetTimer() {
    countTimer = 0;
    clearTimeout(timerPtr);
    document.querySelector('.timer').textContent = countTimer;
}

function resetStars() {
    document.querySelectorAll('.stars li').forEach(function (e) {
        e.firstElementChild.className = "fa fa-star";
    });
}

function resetDeck() {
    cards.forEach(function (elem) {
        elem.className = "card";
    });
}