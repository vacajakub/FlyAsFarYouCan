class Background extends GameObject {

    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed);
    }


    render = () => {
        ctx.drawImage(background, this.x, 0, this.width, this.height);
        // ctx.drawImage(background, 0, 0, 800, 400, this.x, this.y, this.w, this.h);
    }


    update = () => {
        this.x -= this.speed;
        if(this.x <= -CANVAS_WIDTH){
            this.x = CANVAS_WIDTH;
        }
    }

}