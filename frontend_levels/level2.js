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
    900, 400, 50, 85);
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



  ceiling = createSprite(
    500, -50, 1100, 100
  )
  floor = createSprite(
    500, 750, 1100, 100
  )
  leftWall = createSprite(
    -50, 350, 100, 1100
  )
  rightWall = createSprite(
    1050, 350, 100, 1100
  )

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
  clear()
  background(250, 250, 250, 100);
  drawSprites();

  if (keyIsDown(LEFT_ARROW)) {
    if (gravityDirection === 'up' || gravityDirection === 'down') {
      player.mirrorX(-1)
    }
    player.position.x -= (5 + jumpLeft);
  }
  if(keyIsDown(RIGHT_ARROW)) {
    if (gravityDirection === 'up' || gravityDirection === 'down') {
      player.mirrorX(1)
    }
    player.position.x += (5 + jumpRight);
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (gravityDirection === 'left' || gravityDirection === 'right') {
      player.mirrorY(1)
    }
    player.position.y += (5 + jumpDown);
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(SHIFT)) {
    if (gravityDirection === 'left' || gravityDirection === 'right') {
      player.mirrorY(-1)
    }
    player.position.y -= (5 + jumpUp);
  }


  //////////////////////////////////////// Gravity
  gravitySpeedX += gravityX
  gravitySpeedY += gravityY
  player.position.x += gravitySpeedX
  player.position.y += gravitySpeedY
  if (gravityDirection === 'down') {
    player.addImage(rest)
    player.mirrorY(1)
    gravityY = 0.3;
    gravityX = 0;
    gravitySpeedX = 0;
    jumpDown = 0;
    jumpUp = 4;
    jumpLeft = 0;
    jumpRight = 0;
    player.originalHeight = 100;
    player.originalWidth = 30;
  }
  else if (gravityDirection === 'up') {
    player.addImage(rest)
    player.mirrorY(-1)
    gravityY = -0.3;
    gravityX = 0;
    gravitySpeedX = 0;
    jumpDown = 4;
    jumpUp = 0;
    jumpLeft = 0;
    jumpRight = 0;
    player.originalHeight = 100;
    player.originalWidth = 30;
  }
  else if (gravityDirection === 'right') {
    player.addImage(restL)
    player.mirrorX(-1)
    gravityY = 0;
    gravityX = 0.3;
    gravitySpeedY = 0;
    jumpDown = 0;
    jumpUp = 0;
    jumpLeft = 4;
    jumpRight = 0;
    player.originalHeight = 30;
    player.originalWidth = 100;
  }
  else if (gravityDirection === 'left') {
    player.addImage(restL)
    player.mirrorX(1)
    gravityY = 0;
    gravityX = -0.3;
    gravitySpeedY = 0;
    jumpDown = 0;
    jumpUp = 0;
    jumpLeft = 0;
    jumpRight = 4;
    player.originalHeight = 30;
    player.originalWidth = 100;
  }

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

  function hardFloor(sprite) {
    if ( // down
      player.position.x + (player.originalWidth / 2) > sprite.position.x - (sprite._internalWidth / 2) &&
      player.position.x - (player.originalWidth / 2) < sprite.position.x + (sprite._internalWidth / 2) &&
      player.position.y + (player.originalHeight / 2) >= sprite.position.y - (sprite._internalHeight /2) &&
      player.position.y + (player.originalHeight / 2) <= sprite.position.y
    ){
      player.position.y = sprite.position.y - (sprite._internalHeight / 2) - (player.originalHeight / 2);
      (gravityDirection === 'down') ? gravitySpeedY = 0 : 0;
    }
  }
  function hardRight(sprite) {
    if ( // left
      player.position.y + (player.originalHeight / 2) > sprite.position.y - (sprite._internalHeight / 2) &&
      player.position.y - (player.originalHeight / 2) < sprite.position.y + (sprite._internalHeight / 2) &&
      player.position.x + (player.originalWidth / 2) >= sprite.position.x - (sprite._internalWidth / 2) &&
      player.position.x + (player.originalWidth / 2) <= sprite.position.x
      ){
        player.position.x = sprite.position.x - (sprite._internalWidth / 2) - (player.originalWidth / 2);
        (gravityDirection === 'right') ? gravitySpeedX = 0 : 0;
    }
  }
  function hardLeft(sprite) {
    if ( // right
      player.position.y + (player.originalHeight / 2) > sprite.position.y - (sprite._internalHeight / 2) &&
      player.position.y - (player.originalHeight / 2) < sprite.position.y + (sprite._internalHeight / 2) &&
      player.position.x - (player.originalWidth / 2) <= sprite.position.x + (sprite._internalWidth / 2) &&
      player.position.x - (player.originalWidth / 2) >= sprite.position.x
      ){
        player.position.x = sprite.position.x + (sprite._internalWidth / 2) + (player.originalWidth / 2);
        (gravityDirection === 'left') ? gravitySpeedX = 0 : 0;
    }
  }
  function hardCeiling(sprite) {
    if ( // up
      player.position.x + (player.originalWidth / 2) > sprite.position.x - (sprite._internalWidth / 2) &&
      player.position.x - (player.originalWidth / 2) < sprite.position.x + (sprite._internalWidth / 2) &&
      player.position.y - (player.originalHeight / 2) <= sprite.position.y + (sprite._internalHeight /2) &&
      player.position.y - (player.originalHeight / 2) >= sprite.position.y //- (sprite._internalHeight /2)
    ){
      player.position.y = sprite.position.y + (sprite._internalHeight / 2) + (player.originalHeight / 2);
      (gravityDirection === 'up') ? gravitySpeedY = 0 : 0;
    }
  }
  function platform(sprite) {
    hardCeiling(sprite)
    hardFloor(sprite)
    hardLeft(sprite)
    hardRight(sprite)
  }

  hardCeiling(ceiling)
  hardFloor(floor)
  hardLeft(leftWall)
  hardRight(rightWall)
  platform(platformLeft)
  platform(platformRight)

} //////////////////////////////////////////////// CLOSE L1
