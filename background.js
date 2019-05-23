class Background extends GameObject {

    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed);
        this.maxSpeed = 6;
    }

    render() {
        ctx.drawImage(background, this.x, 0, this.width, this.height);
    }

    update(){
        this.x -= this.speed;
        if (this.x <= -CANVAS_WIDTH) {
            this.x = CANVAS_WIDTH;
        }
    }

    incrementSpeed(){
        var newSpeed = this.speed + 0.25;
        if(newSpeed > this.maxSpeed){
            newSpeed = this.maxSpeed;
        }
        this.speed = newSpeed;
    }


    //DOENST WORK IN MOZZILA
    // render = () => {
    //     ctx.drawImage(background, this.x, 0, this.width, this.height);
    // }


    // update = () => {
    //     this.x -= this.speed;
    //     if (this.x <= -CANVAS_WIDTH) {
    //         this.x = CANVAS_WIDTH;
    //     }
    // }

    // incrementSpeed = () => {
    //     var newSpeed = this.speed + 0.25;
    //     if (newSpeed > this.maxSpeed) {
    //         newSpeed = this.maxSpeed;
    //     }
    //     this.speed = newSpeed;
    // }
}