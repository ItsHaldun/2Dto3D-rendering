let walls = [];
let objects = [];
let number_of_rays = 256;
let player;

let WIDTH;
let HEIGHT;

function setup() {
	WIDTH = windowWidth;
	HEIGHT = windowHeight * 0.95;
  createCanvas(WIDTH, HEIGHT);

	// Beginning Section
  objects.push(new rectangleWall(0, 0.1*HEIGHT, 0.05*WIDTH, 0.02*HEIGHT));
  objects.push(new rectangleWall(0.15*WIDTH, 0, 0.02*WIDTH, 0.15*HEIGHT));
	objects.push(new rectangleWall(0.15*WIDTH, 0.25*HEIGHT, 0.02*WIDTH, 0.15*HEIGHT));
	objects.push(new rectangleWall(0.03*WIDTH, 0.3*HEIGHT, 0.04*WIDTH, 0.08*HEIGHT));
	
	// Middle Section
	objects.push(new rectangleWall(0.24*WIDTH, 0.05*HEIGHT, 0.2*WIDTH, 0.08*HEIGHT));
	objects.push(new rectangleWall(0.48*WIDTH, 0.05*HEIGHT, 0.1*WIDTH, 0.08*HEIGHT));

	objects.push(new rectangleWall(0.24*WIDTH, 0.28*HEIGHT, 0.04*WIDTH, 0.04*HEIGHT));
	objects.push(new rectangleWall(0.32*WIDTH, 0.28*HEIGHT, 0.04*WIDTH, 0.04*HEIGHT));
	objects.push(new rectangleWall(0.40*WIDTH, 0.28*HEIGHT, 0.04*WIDTH, 0.04*HEIGHT));
	objects.push(new rectangleWall(0.48*WIDTH, 0.28*HEIGHT, 0.04*WIDTH, 0.04*HEIGHT));
	objects.push(new rectangleWall(0.56*WIDTH, 0.28*HEIGHT, 0.04*WIDTH, 0.04*HEIGHT));

	objects.push(new rectangleWall(0.30*WIDTH, 0.44*HEIGHT, 0.01*WIDTH, 0.04*HEIGHT));
	objects.push(new rectangleWall(0.36*WIDTH, 0.40*HEIGHT, 0.01*WIDTH, 0.08*HEIGHT));

	// End Section
	objects.push(new rectangleWall(0.7*WIDTH, 0, 0.04*WIDTH, 0.4*HEIGHT));
	objects.push(new rectangleWall(0.85*WIDTH, 0.08*HEIGHT, 0.04*WIDTH, 0.4*HEIGHT));
	objects.push(new rectangleWall(0.94*WIDTH, 0.2*HEIGHT, 0.04*WIDTH, 0.08*HEIGHT));

	objects.push(new rectangleWall(0, 0.95*HEIGHT/2, WIDTH, 0.01*HEIGHT));
	

  for(let i=0; i<objects.length; i++) {
    for(let j=0; j<objects[i].sides.length; j++) {
      walls.push(objects[i].sides[j]);
    }
  }

  player = new Player(number_of_rays, 0.02*WIDTH, 0.05*HEIGHT, 5, 1, 2, WIDTH, HEIGHT);
}

function draw() {
  background(0);

	player.collusionCheck(objects);
  player.move();

  player.cast(walls);

  for(let i=0; i<objects.length; i++) {
    objects[i].show();
  }
  player.show();
  player.draw3D();
}