var canvas;
var ctx;
var background;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

window.onload = function () {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    var background1 = document.getElementById('background1');
    var background2 = document.getElementById('background2');
    var background3 = document.getElementById('background3');
    var background4 = document.getElementById('background4');
    setBackground(1);
    var bg1 = new Background(0, 0, 800, 400, 2);
    var bg2 = new Background(800, 0, 800, 400, 2);
    loop();


    function loop() {
        bg1.update();
        bg2.update();
        ctx.clearRect(0, 0, 800, 400);
        bg1.draw();
        bg2.draw();
        window.requestAnimationFrame(loop);
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
            case 4:
                background = background4;
                break;
            default:
        }
    }
}
