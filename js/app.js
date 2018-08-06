// Enemies our player must avoid

let level = 1;
const MAX_LEVEL = 10;
const WATER_POINTS = 2;
const scoreEl = document.querySelector("#score-id");
const buttons = document.querySelector(".players");
let isGamePause = false;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player;
let bonus;


var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load img
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 200) + 50;
    this.sprite = 'img/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 502) {
        this.x = -90;
        //multiplying the speed with the level and generating the random value so that speed can be increased with levels.
        this.speed = 100 + (Math.floor(Math.random() * 20) + 20) * level;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'img/char-boy.png';
    this.life = 3;
    this.score = 0;
}

Player.prototype.update = function () {
    //if the player reaches to the left side of canvas, set the position to 0.
    if (this.x < 0) {
        this.x = 0;
    }
    //if the player reaches to the right most side of canvas, set the position to 400.
    if (this.x > 400) {
        this.x = 400;
    }
    //If the player touches the water, resets the position to initial position.
    if (this.y < 0) {
        //resets the char position as he touches the water.
        this.resetPosition();
        //increment the level till it reaches MAX_LEVEL as it is used to increment the speed.
        (level < MAX_LEVEL) ? level++ : level;

        //if user touches the water, if gets 2 points.
        this.updateScore(WATER_POINTS);
        //Create a new bonus when user reaches the water.
        bonus = new Bonus();
    }
    //If the player touches the downmost of the canvas, reset the y position to initial position.
    if (this.y > 400) {
        this.y = 393;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Function to reset the character's position.
Player.prototype.resetPosition = function () {
    this.x = 202;
    this.y = 393;
}

//function to update player's score by the num.
Player.prototype.updateScore = function (num) {
    this.score += num;
    scoreEl.textContent = this.score;
}

//function to handle the player position based on the user input.
Player.prototype.handleInput = function (keyCode) {
    if (!isGamePause) {
        switch(keyCode) {
            case 'left':
                this.x = this.x - 101;
                break;
            case 'up':
                this.y = this.y - 83;
                break;
            case 'right':
                this.x = this.x + 101;
                break;
            case 'down':
                this.y = this.y + 83;
                break;
        }
    }
};

var Bonus = function () {
    var images = [
        'img/gem-Blue.png',
        'img/gem-Green.png',
        'img/gem-Orange.png'
    ];

    //randomly select the gems from the array.
    let value = Math.floor(Math.random() * 3);
    this.sprite = images[value];
    this.points = 5 * value;

    this.x = 101 + Math.floor(Math.random() * 5);
    this.y = 62 + (83 * (Math.floor(Math.random() * 3)));
};

Bonus.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keyup', function (e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        player.handleInput(allowedKeys[e.keyCode]);
    });
    //Sets the click listener on the character buttons and extract the image src so that htmlcanvas can redraw the
    //character based on the user click.
    buttons.addEventListener('click', (event) => {
        if (event.target.tagName.toUpperCase() === "IMG") {
            if (player !== undefined) {
                player.sprite = event.target.getAttribute('src');
                player.render();
            }
        }
    });
});