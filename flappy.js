// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 500, Phaser.AUTO, 'game', stateActions);
var score = -2;
var player;
var block;
var title;
var pipes;
var text;
var titleText1;
var titleText2;
var backgroundMusic;
var deathBlock;
function gameOver() {
    player.body.gravity.y = 4000;
    game.add.sprite(175, 150, "bowserEnding");
    game.add.text(416, 189, score,
        {font: "25px Ahoroni", fill: "#FFFFFF"})


}


/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("jumpingMario", "assets/JumpingMario2.jpg");
    game.load.audio("Jump", "assets/smb_jump-small.wav");
    game.load.image("Title", "assets/Super Mario Bros Title.jpg");
    game.load.image("background", "assets/mario background.png");
    game.load.audio("backgroundMusic", "assets/Super Mario Bros. - Full.mp3");
    game.load.image("pipeSegment", "assets/Pipe segment.png");
    game.load.audio("gameOver", "assets/game over.wav");
    game.load.image("bottomBlock", "assets/bottom block.png");
    game.load.image("bowserEnding", "assets/Bowser game over.jpg");
    game.load.image("normalMario", "assets/normal mario.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    backgroundMusic = game.sound.play("backgroundMusic")
    game.add.tileSprite(0, 0, 1000, 600, 'background');
    title = game.add.sprite(225, 10, "Title");
    titleText1 = game.add.text(226, 220, "Left click to begin",
        {font: "30px Courier", fill: "#FFFFFF"})

    titleText2 = game.add.text(170, 290, "Press the spacebar to jump",
        {font: "30px Courier", fill: "#FFFFFF"})
    player = game.add.sprite(60, 60, "jumpingMario");
    game.physics.arcade.enable(player);

    player.scale.setTo(0.3, 0.3);
    game.input.
        onDown.add(clickHandler);
    game.input.
        keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);


    pipes = game.add.group();


    text = game.add.text(750, 10, score,
        {
            font: "30px Ahoroni", fill: "#FFFFFF"
        })
    block = game.add.sprite(0, 430, "bottomBlock")
    game.physics.arcade.enable(block)


}

function add_pipe_block(x, y)
{
    var pipe = pipes.create(x, y, "pipeSegment");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;

}



function pipeGenerator () {



        var gapStart = game.rnd.integerInRange(1, 5);
        var gapEnd = game.rnd.integerInRange(6, 9);
        for (var count = 0; count <= 10; count++)
            if (count != gapStart && count != gapStart + 1) {
                add_pipe_block(800, count * 50);

            }

    changescore();
    }

function update()
{   game.physics.arcade.overlap(player, pipes, gameOver);
    game.physics.arcade.overlap(player, block, gameOver);
}


function clickHandler (event) {

    game.time.events.loop(Phaser.Timer.SECOND * 1.8, pipeGenerator);
    title.kill();
    player.body.gravity.y = 400;
    game.world.remove(titleText1);
    game.world.remove(titleText2);



}
//do not make this irrelevant
function spaceHandler () {





    player.body.velocity.y = 50;


    playerJump();
    game.sound.play("Jump")
}

function playerJump() {
    player.body.velocity.y = -200

}


    //game.sound.play("Jump");



/*
 * This function updates the scene. It is called for every new frame.
 */

function changescore() {
    score = score + 1;
    text.setText(score.toString());
}
