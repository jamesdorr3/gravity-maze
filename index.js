let x = 200;
let y = 200;
let a = 300;
let b = 300;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250);
  fill(0);
  ellipse(x,y,50,50);

  //x = x + 1;

  if (x >= width){
   x = width;
 }
   if (x <= 0){
    x = 0;
  }
  if (y >= height) {
    y = height;
  }
  if (y <= 0) {
    y = 0;
  };
  ellipse(a,b,30,30);

  //x = x + 1;

  if (a >= width){
   a = width;
  }
   if (a <= 0){
    a = 0;
  }
  if (b >= height) {
    b = height;
  }
  if (b <= 0) {
    b = 0;
  }
}

function keyPressed() {
  if (keyCode === 87) {
    y = y - 50;
  } else if (keyCode === 83) {
   y = y + 50;
  }
  if (keyCode === 65) {
    x = x - 50;
  } else if (keyCode === 68) {
    x = x + 50;
  };
  if (keyCode === UP_ARROW) {
    b = b - 50;
  } else if (keyCode === DOWN_ARROW) {
   b = b + 50;
  }
  if (keyCode === LEFT_ARROW) {
    a = a - 50;
  } else if (keyCode === RIGHT_ARROW) {
    a = a + 50;
  }
}
