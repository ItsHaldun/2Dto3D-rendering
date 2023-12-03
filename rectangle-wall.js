class rectangleWall {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.sides = [];
        this.sides.push(new Boundary(x,y,x+width,y));   //Top
        this.sides.push(new Boundary(x+width,y,x+width,y+width));   //Right
        this.sides.push(new Boundary(x,y+width, x+width,y+width));   //Bottom
        this.sides.push(new Boundary(x,y,x,y+width));   //Left
    }

    show() {
        push();
        fill(255);
        rectMode(CORNER);
        rect(this.x, this.y, this.width, this.height);
        pop();
    }
}