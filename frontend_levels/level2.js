function level2Preload() {
  rest = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001.png');
  walkAnim = loadAnimation( `/Fruits_Papaya_2D_Game_Asset/actions/run/0001.png`,
  `/Fruits_Papaya_2D_Game_Asset/actions/run/0029.png`
  )
  restL = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001l.png');

  restR = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001r.png');
  restDown = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001u.png');
  // restR = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001r.png');

  fire = loadImage(fetchURL + 'fire.png');

  doorImg = loadImage('http://localhost:3000/moondoor.png')
  coneUpImg = loadImage(fetchURL + 'coneUp.png')
  coneDownImg = loadImage(fetchURL + 'coneDown.png')
  coneLeftImg = loadImage(fetchURL + 'coneLeft.png')
  coneRightImg = loadImage(fetchURL + 'coneRight.png')
}

function level2Setup() {
  createCanvas(1000, 700);

  door = createSprite(
    900, 300, 50, 85);
  door.addImage(doorImg, 0, 0)
  door.scale = .4

  coneDown = createSprite(
    750, 250, 10, 70);
  coneDown.addImage(coneDownImg, 0, 0)

  coneDown2 = createSprite(
   500, 200, 10, 70);
  coneDown2.addImage(coneDownImg, 0, 0)

  coneUp = createSprite(
    800, 200, 10, 70);
  coneUp.addImage(coneUpImg, 0, 0)

  coneUp2 = createSprite(
     200, 400, 1, 70);
  coneUp2.addImage(coneUpImg, 0, 0)

  coneLeft = createSprite(
    920, 570, 1, 70);
  coneLeft.addImage(coneLeftImg, 0, 0)

  coneRight = createSprite(
    200, 200, 1, 70);
  coneRight.addImage(coneRightImg, 0, 0)

  coneRight2 = createSprite(
    100, 600, 1, 70);
  coneRight2.addImage(coneRightImg, 0, 0)


  platformLeft = createSprite(
    150, 550, 300, 40
  );

  platformRight = createSprite(
    950, 500, 300, 40
  );

  death = createSprite(
    350, 775, 1000, 75
  );
  death.visible = false
  death.addImage(fire)

  deathPic = createSprite(
    350, 675, 1000, 75
  );
  deathPic.addImage(fire)


  player = createSprite(  // PLAYER ALWAYS LAST SO SHE'S ABOVE OTHERS
  100, 50, 30, 100);
  player.addImage(rest, 0, 0)
  // player.addAnimation('walk', walkAnim)
  // player.changeAnimation('walk')
  player.setCollider("rectangle", 0, 0, 50, 100)
}

function level2Draw() {

////////////////////////////// THIS IS DIFFERENT IN EVERY LEVEL vv

  if (player.overlap(coneUp) || player.overlap(coneUp2)) {
    gravityDirection = 'up'
  }

  if (player.overlap(coneDown)|| player.overlap(coneDown2)) {
    gravityDirection = 'down'
  }
  if (player.overlap(coneLeft)) {
    gravityDirection = 'left'
  }
  if (player.overlap(coneRight)|| player.overlap(coneRight2)) {
    gravityDirection = 'right'
  }

  if (player.overlap(death)) {
    player.position.x = 100;
    player.position.y = 50;
    gravityDirection = 'down'
    gravitySpeedX = 0
    gravitySpeedY = 0
    die()
  }
  ////////////////////////// DIFFERENT IN EVERY LEVEL ^^
  if (player.overlap(door)) {
    level += 1
    preload()
    setup()
    draw()
  }
  ////////////////////////////////////// BARRIER PHYSICS

  hardCeiling(ceiling)
  hardFloor(floor)
  hardLeft(leftWall)
  hardRight(rightWall)
  platform(platformLeft)
  platform(platformRight)

} //////////////////////////////////////////////// CLOSE L1
