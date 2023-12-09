class Player {
    constructor(number_of_rays, x=200, y=200, moveSpeed=3, rotSpeed=3) {
				// Location parameters
        this.pos = createVector(x, y);
        this.dir = createVector(1, 0);

				// Movement parameters
				this.move_speed = moveSpeed;
				this.rot_speed = rotSpeed;

				// If the player is colliding with an object, we can inhibit movement
				this.collidedObject = null;

				// Initialize the rays
        this.rays = [];
        for(let i=number_of_rays/2; i>-number_of_rays/2; i--) {
            let angle = i * (40 / (number_of_rays/2));
            this.rays.push(new Ray(angle));
        }
        
				// Move the player to the starting position
        this.updatePosition(x, y);
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

    updatePosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;

        for(let i=0; i<this.rays.length; i++) {
            this.rays[i].updatePosition(x, y);
        }
    }

		collusionCheck(objects) {
			let slack = this.move_speed;
			for (let i=0; i<objects.length; i++) {
				// Check for collusion with object
				if (this.pos.x >= objects[i].x - slack && this.pos.x <= objects[i].x + objects[i].width + slack) {
					if (this.pos.y >= objects[i].y - slack && this.pos.y <= objects[i].y + objects[i].height + slack) {
						// If it collides with something, get the collided object
						this.collidedObject = objects[i];
						break;
					}
				}
				// If it doesn't collide with anything, return nothing
				this.collidedObject = null;
			}
		}

		move() {
			let x = this.pos.x;
			let y = this.pos.y;
			let dir = this.dir;
		
			if (keyIsDown(LEFT_ARROW)) {
				this.rotate(this.rot_speed);
			}
			if (keyIsDown(RIGHT_ARROW)) {
				this.rotate(-this.rot_speed);
			}
			if (keyIsDown(UP_ARROW)) {
				// Check if we would move inside the collided object
				if (this.collidedObject != null) {
					if (x + dir.x * this.move_speed >= this.collidedObject.x && x + dir.x * this.move_speed <= this.collidedObject.x + this.collidedObject.width) {
						if (y + dir.y * this.move_speed >= this.collidedObject.y && y + dir.y * this.move_speed <= this.collidedObject.y + this.collidedObject.height) {
							return;
						}
					}
				}
				x += dir.x * this.move_speed;
				y -= - dir.y * this.move_speed;
			}
			if (keyIsDown(DOWN_ARROW)) {
				// Check if we would move inside the collided object
				if (this.collidedObject != null) {
					if (x - dir.x * this.move_speed >= this.collidedObject.x && x - dir.x * this.move_speed <= this.collidedObject.x + this.collidedObject.width) {
						if (y - dir.y * this.move_speed >= this.collidedObject.y && y - dir.y * this.move_speed <= this.collidedObject.y + this.collidedObject.height) {
							return;
						}
					}
			}
				x -= dir.x * this.move_speed;
				y += - dir.y * this.move_speed;
			}
			this.updatePosition(x, y);
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