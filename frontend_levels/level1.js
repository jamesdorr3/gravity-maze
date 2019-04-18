function level1() {

clear();
background(250, 250, 250, 100);
fill(0);
// rect(x,y,50,100);
// fill(0);
// rect(360, 320, 40, 80);
// fill(250)
// const upTri = triangle (300, 390, 310, 340, 320, 390)
drawSprites();

//x = x + 1;

if (keyIsDown(LEFT_ARROW)) {
  player.mirrorX(-1)
  player.position.x -= 5;
}
if(keyIsDown(RIGHT_ARROW)) {
  player.mirrorX(1)
  player.position.x += 5;
}
if (keyIsDown(DOWN_ARROW)) {
  player.position.y += 5;
}
if (keyIsDown(UP_ARROW)) {
  player.position.y -= 5;
}
if (keyIsDown(SHIFT)) {
  player.position.y -= 5;
}

// Gravity
switch (gravityDirection) {
  case 'down':
    player.mirrorY(1)
    if (player.position.x > width - 25){
      player.position.x = width - 25;}
    else if (player.position.x < 0 + 25){
      player.position.x = 0 + 25;}
    else if (player.position.y > height - 50) {
      player.position.y = height - 50;
      gravitySpeed = 0;}
    else if (player.position.y < 0 + 50) {
      player.position.y = 0 + 50;
      gravitySpeed = 0;}
    gravitySpeed += gravity;
    player.position.x += xSpeed;
    player.position.y += ySpeed + gravitySpeed;
    break;
  case 'up':
    player.mirrorY(-1)
    if (player.position.x > width - 25){
      player.position.x = width - 25;}
    else if (player.position.x < 0 + 25){
      player.position.x = 0 + 25;}
    else if (player.position.y > height - 50) {
      player.position.y = height - 50;
      gravitySpeed = 0;}
    else if (player.position.y < 0 + 50) {
      player.position.y = 0 + 50;
      gravitySpeed = 0;}
    gravitySpeed += gravity;
    player.position.x += xSpeed;
    player.position.y -= ySpeed + gravitySpeed;
    break;
  case 'left':
    if (player.position.x > width - 25){
      player.position.x = width - 25;
      gravitySpeed = 0;}
    else if (player.position.x < 0 + 25){
      player.position.x = 0 + 25;
      gravitySpeed = 0;}
    else if (player.position.y > height - 50) {
      player.position.y = height - 50;}
    else if (player.position.y < 0 + 50) {
      player.position.y = 0 + 50;}
    gravitySpeed += gravity;
    player.position.x -= xSpeed + gravitySpeed;
    player.position.y += ySpeed;
    break;
  case 'right':
    if (player.position.x > width - 25){
      player.position.x = width - 25;
      gravitySpeed = 0;}
    else if (player.position.x < 0 + 25){
      player.position.x = 0 + 25;
      gravitySpeed = 0;}
    else if (player.position.y > height - 50) {
      player.position.y = height - 50;}
    else if (player.position.y < 0 + 50) {
      player.position.y = 0 + 50;}
    gravitySpeed += gravity;
    player.position.x += xSpeed + gravitySpeed;
    player.position.y += ySpeed;
    break;
}

if (player.overlap(coneUp)) {
  gravityDirection = 'up'
}

if (player.overlap(coneDown)) {
  // debugger
  gravityDirection = 'down'
}

if (player.overlap(coneLeft)) {
  gravityDirection = 'left'
}

if (player.overlap(coneRight)) {
  gravityDirection = 'right'
}

// if (player.overlap(door)) {
//   console.log('You win!')
// }

if (player.overlap(door)) {
  // noLoop();
  level = 2

}

// function game () {
//   // debugger
// console.log("game")
// }


if (player.collide(wall) || player.collide(wall2)) {
  xSpeed = 0;
  gravitySpeed = 0
}
}
