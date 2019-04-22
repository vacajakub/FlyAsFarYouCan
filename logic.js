var canvas;
var ctx;
var background;
var playerImg;

var gameOver = false;
var paused = false;
var score = 0;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

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
    setBackground(Math.floor(Math.random() * 3) + 1);  
    var bg1 = new Background(0, 0, 800, 400, 2);
    var bg2 = new Background(800, 0, 800, 400, 2);
    var player = new Player(60, 125, 80, 80, 2);

    loop();

    //pole obstacles a kontrolovat vse, pridat nove vzdy na nejaky frame


    document.addEventListener('keydown', (event) => {
        if (event.key == "ArrowUp") {
            console.log("up");
            player.moveUp(player.getSpeed());
        } else if (event.key == "Escape") {
            if (paused) {
                paused = false;
                loop();
            } else {
                paused = true;
            }
        } else if(event.key == "Enter"){
            if(gameOver){
                window.location.reload();
            }
        }
    });

    function loop() {

        if (!gameOver && !paused) {
            bg1.update();
            bg2.update();
            player.update();
            ctx.clearRect(0, 0, 800, 400);
            bg1.render();
            bg2.render();
            player.render();
        }


        if (gameOver) {
            ctx.font = '56px Lucida Console';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.fillStyle = 'white';
            ctx.fillText("Game Over", 400, 200);
        } else if (paused) {
            ctx.font = '40px Lucida Console';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.fillStyle = 'white';
            ctx.fillText("Paused", 400, 200);
            ctx.font = '26px Lucida Console';
            ctx.fillText("press ESC to continue", 400, 250);
        } else {
            window.requestAnimationFrame(loop);
        }
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
