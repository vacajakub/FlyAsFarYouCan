class Obstacle extends GameObject {

    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed);
        this.maxSpeed = 6;
    }


    render = () => {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update = () => {
        this.x -= this.speed;
        if (this.x + this.width <= 0) {
            this.height = Math.floor(Math.random() * MAX_OBSTACLE_HEIGHT) + 75;
            if (this.height > 200) {
                this.y = Math.floor(Math.random() * 2) * (CANVAS_HEIGHT - this.height);
            } else {
                this.y = Math.floor(Math.random() * (CANVAS_HEIGHT - this.height));
            }
            this.x = CANVAS_WIDTH;
        }

    }

    incrementSpeed = () => {
        var newSpeed = this.speed + 0.5;
        if (newSpeed > this.maxSpeed) {
            newSpeed = this.maxSpeed;
        }
        this.speed = newSpeed;
    }
}