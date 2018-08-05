/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    //doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        if(!isGamePause){
            updateEntities(dt);
            checkCollisions();
        }
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function checkCollisions(){
        allEnemies.forEach(function(enemy){
            if((enemy.x < player.x+75 && enemy.x > player.x-75) &&
               (enemy.y > player.y - 75 && enemy.y < player.y + 75)) {
                console.log("crashed");
                player.resetPosition();
                reduceLife();
                player.updateScore(-1);
            }
        });
    }

function reduceLife(){
    if(player.life > 0)
    {
        player.life = player.life-1;
        let lifeIcons = document.querySelectorAll('.fa-heart');
        lifeIcons[lifeIcons.length -1].className = "fa fa-heart-o";
    }else {
        isGamePause = true;
        swal({
                closeOnEsc: false,
                closeOnClickOutside: false,
                title: "Game Over!!! You lost the Game",
                text: `Your score is `,
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
                if(value){
                   init();
                   isGamePause = false;
               }
            });
    }
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'img/water-block.png',   // Top row is water
                'img/stone-block.png',   // Row 1 of 3 of stone
                'img/stone-block.png',   // Row 2 of 3 of stone
                'img/stone-block.png',   // Row 3 of 3 of stone
                'img/grass-block.png',   // Row 1 of 2 of grass
                'img/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
        allEnemies = [];
        var yXPosition = [60, 145, 225];
        var XPos = -101;
        yXPosition.forEach(function(posY){
            allEnemies.push(new Enemy(-101, posY, Math.floor(Math.random() * 40)));
        });
        allEnemies.push(new Enemy(-101, (60+ Math.floor(Math.random() * 100))));
        player = new Player(202, 393);
        player.updateScore(0);
        resetLifes();

    }

    function resetLifes(){
         document.querySelectorAll('.life li').forEach(e =>{
            e.firstElementChild.className = "fa fa-heart";
        });
    }

    /* Go ahead and load all of the img we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these img are properly loaded our game will start.
     */
    Resources.load([
        'img/stone-block.png',
        'img/water-block.png',
        'img/grass-block.png',
        'img/enemy-bug.png',
        'img/char-boy.png',
        'img/char-cat-girl.png',
        'img/char-horn-girl.png',
        'img/char-pink-girl.png',
        'img/char-princess-girl.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
