var canvas;
var ctx;
var background;
var playerImg;
var obstacleImg;
var obstacle;
var obstacle2;
var crashSound;

var gameOver = false;
var paused = true;
var score = 0;
var frame = 0;


const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const MAX_OBSTACLE_HEIGHT = CANVAS_HEIGHT - 250;
const COLLISION_RESERVE = 5;


var dt = 0;
var t1 = Date.now();


window.onload = function () {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    ctx.font = '56px Lucida Console';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';

    let background1 = document.getElementById('background1');
    let background2 = document.getElementById('background2');
    let background3 = document.getElementById('background3');
    playerImg = document.getElementById('plane');
    playerImg2 = document.getElementById('plane2');
    playerImgDead = document.getElementById('planeDead');
    obstacleImg = document.getElementById('obstacle');
    setBackground(Math.floor(Math.random() * 3) + 1);
    let bg1 = new Background(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 2);
    let bg2 = new Background(CANVAS_WIDTH, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 2);
    let player = new Player(60, 125, 60, 60, 2.75);
    obstacle = new Obstacle(800, Math.floor(Math.random() * (CANVAS_HEIGHT - 100)), 40, 100, 2);
    obstacle2 = new Obstacle(1200, Math.floor(Math.random() * (CANVAS_HEIGHT - 100)), 40, 100, 2);
    const music = new Audio("Electronic-beat.mp3");
    const helicopterSound = new Audio("helicopter1.wav");
    crashSound = new Audio("crash.wav");
    let scoreLog = JSON.parse(localStorage.getItem("scoreboard")) || [];
    let scoreboard = document.getElementById("scoreboard")
    const scoreLink = document.getElementById("scorelink");
    const controlsLink = document.getElementById("controllink");
    const gameLink = document.getElementById("gamelink");
    const suggestionLink = document.getElementById("suggestionlink");
    const onlineIcon = document.getElementById("online");
    const offlineIcon = document.getElementById("offline");
    const formSubmit = document.getElementById("formsubmit");
    const form = document.getElementById("contact");
    const formEmail = document.getElementById("email");
    const formTextArea = document.getElementById("textarea");
    if(navigator.onLine){
        onlineIcon.classList.add("show");
        offlineIcon.classList.remove("show");
    } else {
        onlineIcon.classList.remove("show");
        offlineIcon.classList.add("show");
    }

    fillScoreboard();
    renderAll();
    play();
    // music.play();


    document.addEventListener('keydown', (event) => {
        if (event.key == "ArrowUp") {
            player.moveUp(player.getSpeed());
            helicopterSound.play();
            helicopterSound.pause();
        } else if (event.key == "Escape") {
            if (paused) {
                paused = false;
                play();
                music.play();
            } else {
                paused = true;
            }
        } else if (event.key == "Enter") {
            if (gameOver) {
                window.location.reload();
                paused = false;
            } else if (paused) {
                paused = false;
                play();
                music.play();
            } else {
                paused = true;
            }
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        formEmail.value = "";
        formTextArea.value = "";
    });

    scoreLink.addEventListener('click', (event) => {
        event.preventDefault();
        $("html, body").animate({
            scrollTop: $("#scoreboard").offset().top
        }, 1000);
    });

    controlsLink.addEventListener('click', (event) => {
        event.preventDefault();
        $("html, body").animate({
            scrollTop: $("#controls").offset().top
        }, 1000);
    });

    gameLink.addEventListener('click', (event) => {
        event.preventDefault();
        $("html, body").animate({
            scrollTop: $("#game").offset().top
        }, 1000);
    });

    suggestionLink.addEventListener('click', (event) => {
        event.preventDefault();
        $("html, body").animate({
            scrollTop: $("#suggestion").offset().top
        }, 1000);
    });

    window.addEventListener('online', () => {
        onlineIcon.classList.add("show");
        offlineIcon.classList.remove("show");
    });

    window.addEventListener('offline', () => {
        onlineIcon.classList.remove("show");
        offlineIcon.classList.add("show");
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
                obstacle2.incrementSpeed();
            }
            updateAll();
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            renderAll();
        }


        if (gameOver) {
            music.pause();
            helicopterSound.pause();
            player.render();
            ctx.font = '56px Lucida Console';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.fillStyle = 'white';
            ctx.fillText("Game Over", 400, 200);
            ctx.font = '40px Lucida Console';
            ctx.fillText("Score: " + score, 400, 270);
            scoreLog.push(score);
            localStorage.setItem("scoreboard", JSON.stringify(scoreLog));
            fillScoreboard();
        } else if (paused) {
            music.pause()
            helicopterSound.pause();
            ctx.font = '40px Lucida Console';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.fillStyle = 'white';
            ctx.fillText("press Enter to play", 400, 200);
        } else {
            window.requestAnimationFrame(play);
        }
    }

    function updateAll() {
        bg1.update();
        bg2.update();
        obstacle.update();
        obstacle2.update();
        player.update();
    }

    function renderAll() {
        bg1.render();
        bg2.render();
        player.render();
        obstacle.render();
        obstacle2.render();
    }


    function fillScoreboard() {
        scoreLog = JSON.parse(localStorage.getItem("scoreboard")) || [];
        if (scoreLog.length != 0) {
            scoreLog.sort((a, b) => b - a);
        }
        var size;
        if (scoreLog.length < 10) {
            size = scoreLog.length;
        } else {
            size = 10;
        }
        while (scoreboard.firstChild) {
            scoreboard.removeChild(scoreboard.firstChild);
        }
        let table = document.createElement("table");
        let trHead = document.createElement("tr");
        let thPoradi = document.createElement("th");
        thPoradi.textContent = "#";
        let thScore = document.createElement("th");
        thScore.textContent = "Score";
        scoreboard.appendChild(table);
        table.appendChild(trHead);
        trHead.appendChild(thPoradi);
        trHead.appendChild(thScore);

        for (let i = 0; i < size; i++) {
            const score = scoreLog[i];
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            td1.textContent = i + 1 + ".";
            let td2 = document.createElement("td");
            td2.textContent = score;
            tr.appendChild(td1);
            tr.appendChild(td2);
            table.appendChild(tr);
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
