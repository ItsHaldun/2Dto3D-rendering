let walls = [];
let objects = [];
let number_of_rays = 480;
let player;

function setup() {
  createCanvas(windowWidth, windowHeight);

  objects.push(new rectangleWall(0, 100, 100, 20));
  objects.push(new rectangleWall(0, windowHeight/2 -5, windowWidth, 10));
	objects.push(new rectangleWall(500, 50, 50, 50));
  objects.push(new rectangleWall(500, 250, 50, 50));
  objects.push(new rectangleWall(700, 0, 50, 350));
  objects.push(new rectangleWall(200, 150, 200, 50));
  objects.push(new rectangleWall(350, 10, 50, 50));
	

  for(let i=0; i<objects.length; i++) {
    for(let j=0; j<objects[i].sides.length; j++) {
      walls.push(objects[i].sides[j]);
    }
  }

  player = new Player(number_of_rays, 50, 50);
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