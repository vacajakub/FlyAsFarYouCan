class Player extends GameObject {

    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed);
        this.fallSpeed = 0;
        this.upSpeed = 0;
    }


    draw = () => {
        ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
    }

    update = () => {
        this.fallSpeed += 0.05;
        this.y += this.fallSpeed + this.upSpeed;

        if (this.y >= CANVAS_HEIGHT) {
            gameOver = true;
        }

    }


    moveUp = (speed) => {
        this.fallSpeed = 0;
        this.upSpeed = - speed;
    }

}