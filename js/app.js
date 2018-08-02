// Enemies our player must avoid

var level = 1;
var isGamePause = false;
var Enemy = function(x, y) {
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
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed*dt);
    if(this.x > 502){
        this.x = -90;
        this.speed = 100 + (Math.floor(Math.random() * 20) + 20) * level;
    }

    var width = 171;
    var height = 101 ;
    if(((this.x < player.x + 75) && (this.x > player.x - 75)) &&
        (this.y > player.y - 75 && this.y < player.y + 75)) {
        console.log("crashed");
        player.resetPosition();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'img/char-boy.png';
}

Player.prototype.update = function() {
    //if the player reaches to the left side of canvas, set the position to 0.
    if(this.x < 0 ){
        this.x  = 0;
    }
    //if the player reaches to the right most side of canvas, set the position to 400.
    if(this.x > 400){
        this.x = 400;
    }
    //If the player touches the water, resets the position to initial position.
    if(this.y < 0){
        this.resetPosition();
        level++;
    }
    //If the player touches the downmost of the canvas, reset the y position to initial position.
    if(this.y > 400){
        this.y = 393;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetPosition = function() {
    this.x = 202;
    this.y = 393;
}

Player.prototype.handleInput = function(keyCode) {
    if(!isGamePause){
        if(keyCode === 'left'){
            this.x =  this.x - 101;
        }else if(keyCode === 'up'){
            this.y = this.y - 83;
        }else if(keyCode === 'right'){
            this.x = this.x + 101;
        }else if(keyCode === 'down'){
            this.y = this.y + 83 ;
        }else if(keyCode === 'space'){
            isGamePause = true;
        }
    }else{
        if (keyCode === 'space') {
            isGamePause = false;
        }
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});




