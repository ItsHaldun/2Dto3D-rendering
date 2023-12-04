class Player {
    constructor(number_of_rays, x=200, y=200) {
        this.pos = createVector(x, y);
        this.dir = createVector(1, 0);
        this.rays = [];
        
        for(let i=number_of_rays/2; i>-number_of_rays/2; i--) {
            let angle = i * (40 / (number_of_rays/2));
            this.rays.push(new Ray(angle));
        }
        
        this.move(x, y);
    }

    cast(walls) {
        for(let i=0; i<this.rays.length; i++) {
            this.rays[i].cast_all(walls);
        }
    }

    rotate(angle) {
        this.dir.rotate(-2*PI*angle/360);

        for(let i=0; i<this.rays.length; i++) {
            this.rays[i].rotate(-2*PI*angle/360);
        }
    }

    move(x, y) {
        this.pos.x = x;
        this.pos.y = y;

        for(let i=0; i<this.rays.length; i++) {
            this.rays[i].updatePosition(x, y);
        }
    }

    show() {
        for(let i=0; i<this.rays.length; i++) {
            this.rays[i].show();
        }
    }

    draw3D() {
        let width = windowWidth / this.rays.length;
        let x = 0;

        rectMode(CORNER);

        for(let i=0; i<this.rays.length; i++) {
            let distance = this.rays[i].closest_distance;
            let maxDist = this.rays[i].maxDistance;
            
            let bright = map(distance, maxDist, 0, 0, 255);
            push();
            fill(bright);
            stroke(bright);

            let size = map(distance, maxDist, 0, 0, windowHeight/2);
						let horizon_offset = map(distance, 0, maxDist, 0, 1*windowHeight/4);
						//horizon_offset = 0;
            rect(x, 
                4*windowHeight/4 - size - horizon_offset,
								width, 
								size);

            x += width;
            pop();
        }
    }
}