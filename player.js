class Player extends GameObject {

    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed);
        this.fallSpeed = 0;
        this.upSpeed = 0;
        this.animation = 0;
    }


    render = () => {
        if (gameOver) {
            ctx.drawImage(playerImgDead, this.x, this.y, this.width, this.height);
        } else {
            if (this.animation == 0) {
                ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
            } else if (this.animation == 1) {
                ctx.drawImage(playerImg2, this.x, this.y, this.width, this.height);
            }
        }
    }

    update = () => {
        this.fallSpeed += 0.075;
        this.y += this.fallSpeed + this.upSpeed;
        if (this.animation == 0) {
            this.animation = 1;
        } else {
            this.animation = 0;
        }

        if (this.x + COLLISION_RESERVE < obstacle.getX() + obstacle.getWidth() &&
            this.x + this.width - COLLISION_RESERVE > obstacle.getX() &&
            this.y + 5 < obstacle.getY() + obstacle.getHeight() &&
            this.y + this.height - COLLISION_RESERVE > obstacle.getY()) {
            gameOver = true;
        }
        if (this.x + COLLISION_RESERVE < obstacle2.getX() + obstacle2.getWidth() &&
            this.x + this.width - COLLISION_RESERVE > obstacle2.getX() &&
            this.y + 5 < obstacle2.getY() + obstacle2.getHeight() &&
            this.y + this.height - COLLISION_RESERVE > obstacle2.getY()) {
            gameOver = true;
        }

        if (this.y >= CANVAS_HEIGHT || this.y < -50) {
            gameOver = true;
        }
    }


    moveUp = (speed) => {
        this.fallSpeed = 0;
        this.upSpeed = - speed;
    }

}