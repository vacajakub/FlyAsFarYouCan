class GameObject {

    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
        this.speed = speed;
    }

    render() { }

    update() { }

    getX() { return this.x; }

    getY() { return this.y; }

    getWidth() { return this.width; }

    getHeight() { return this.height; }

    getSpeed() { return this.speed; }

    setSpeed(speed) { this.speed = speed; }


    //DOENST WORK IN MOZZILA
    // render = () => {}
    // update = () => {}
    // getX = () => { return this.x; }
    // getY = () => { return this.y; }
    // getWidth = () => { return this.width; }
    // getHeight = () => { return this.height; }
    // getSpeed = () => { return this.speed; }
    // setSpeed = (speed) => { this.speed = speed; }
}
