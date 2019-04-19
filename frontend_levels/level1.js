function level1Setup() {

  createCanvas(1000, 700);

  door = createSprite(
    940, 385, 50, 85);
  door.addImage(doorImg, 0, 0)
  door.scale = .4

  coneUp = createSprite(
    275, 500, 10, 70);
  coneUp.addImage(coneUpImg, 0, 0)

  coneDown = createSprite(
    950, 70, 1, 70);
  coneDown.addImage(coneDownImg, 0, 0)

  coneUp2 = createSprite(
    20, 250, 1, 70);
  coneUp2.addImage(coneUpImg, 0, 0)

  coneDown2 = createSprite(
    250, 50, 1, 70);
  coneDown2.addImage(coneDownImg, 0, 0)

  platformLeft = createSprite(
    150, 350, 300, 40
  );

  platformRight = createSprite(
    850, 500, 300, 40
  );

  death = createSprite(
    500, 675, 1000, 75
  );
  death.visible = false
  // death.addImage(fire)

  deathPic = createSprite(
    500, 675, 1000, 75
  );
  deathPic.addImage(fire)


  player = createSprite(  // PLAYER ALWAYS LAST SO SHE'S ABOVE OTHERS
  100, 50, 30, 100);
  player.addImage(rest, 0, 0)
  // player.addAnimation('walk', walkAnim)
  // player.changeAnimation('walk')
  player.setCollider("rectangle", 0, 0, 30, 100)
}

function level1Draw() {

  if (player.overlap(coneUp) || player.overlap(coneUp2)) {
    gravityDirection = 'up'
  }

  if (player.overlap(coneDown) || player.overlap(coneDown2)) {
    gravityDirection = 'down'
  }

  if (player.overlap(death)) {
    player.position.x = 100;
    player.position.y = 50;
    gravityDirection = 'down'
    gravitySpeedX = 0
    gravitySpeedY = 0
    die()
  }

  ////////////////////////////////////// BARRIER PHYSICS

  hardCeiling(ceiling)
  hardFloor(floor)
  hardLeft(leftWall)
  hardRight(rightWall)
  platform(platformLeft)
  platform(platformRight)

} //////////////////////////////////////////////// CLOSE L1
