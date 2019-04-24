var canvas;
var ctx;
var background;
var playerImg;
var obstacle;

var gameOver = false;
var paused = false;
var score = 0;
var frame = 0;


const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const MAX_OBSTACLE_HEIGHT = CANVAS_HEIGHT - 200;


var dt = 0;
var t1 = Date.now();

window.onload = function () {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    ctx.font = '56px Lucida Console';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';

    var background1 = document.getElementById('background1');
    var background2 = document.getElementById('background2');
    var background3 = document.getElementById('background3');
    playerImg = document.getElementById('plane');
    playerImg2 = document.getElementById('plane2');
    playerImgDead = document.getElementById('planeDead');
    setBackground(Math.floor(Math.random() * 3) + 1);
    var bg1 = new Background(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 2);
    var bg2 = new Background(CANVAS_WIDTH, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 2);
    var player = new Player(60, 125, 70, 70, 2);
    obstacle = new Obstacle(800, Math.floor(Math.random() * (CANVAS_HEIGHT - 100)), 50, 100, 2);
    play();

    //pole obstacles a kontrolovat vse, pridat nove vzdy na nejaky frame


    document.addEventListener('keydown', (event) => {
        if (event.key == "ArrowUp") {
            player.moveUp(player.getSpeed());
        } else if (event.key == "Escape") {
            if (paused) {
                paused = false;
                play();
            } else {
                paused = true;
            }
        } else if (event.key == "Enter") {
            if (gameOver) {
                window.location.reload();
            }
        }
    });

    function play() {
        if (!gameOver && !paused) {
            let t2 = Date.now();
            dt = t2 - t1;
            t1 = t2;
            frame++;
            if ((frame % 10 == 0)) {
                score++;
            }
            if ((frame % 250) == 0) {
                bg1.incrementSpeed();
                bg2.incrementSpeed();
                obstacle.incrementSpeed();
            }
            updateAll();
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            renderAll();
        }


        if (gameOver) {
            player.render();
            ctx.font = '56px Lucida Console';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.fillStyle = 'white';
            ctx.fillText("Game Over", 400, 200);
            ctx.font = '40px Lucida Console';
            ctx.fillText("Score: " + score, 400, 270);
        } else if (paused) {
            ctx.font = '40px Lucida Console';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.fillStyle = 'white';
            ctx.fillText("Paused", 400, 200);
            ctx.font = '26px Lucida Console';
            ctx.fillText("press ESC to continue", 400, 250);
        } else {
            window.requestAnimationFrame(play);
        }
    }

    function updateAll() {
        bg1.update();
        bg2.update();
        obstacle.update();
        player.update();
    }

    function renderAll() {
        bg1.render();
        bg2.render();
        player.render();
        obstacle.render();
    }


    function setBackground(lvl) {
        switch (lvl) {
            case 1:
                background = background1;
                break;
            case 2:
                background = background2;
                break;
            case 3:
                background = background3;
                break;
            default:
        }
    }
}
