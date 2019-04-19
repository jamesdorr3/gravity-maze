function level3Preload() {
  rest = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001.png');
  restL = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001l.png');

  fire = loadImage(fetchURL + 'fire.png');

  doorImg = loadImage('http://localhost:3000/moondoor.png')
  coneUpImg = loadImage(fetchURL + 'coneUp.png')
  coneDownImg = loadImage(fetchURL + 'coneDown.png')
  coneLeftImg = loadImage(fetchURL + 'coneLeft.png')
  coneRightImg = loadImage(fetchURL + 'coneRight.png')
}

function level3Setup() {

  door = createSprite(
    940, 610, 50, 85);
  door.addImage(doorImg, 0, 0)
  door.scale = .4

  platform1 = createSprite(
    850, 461, 40, 500
  );

  platform2 = createSprite(
    910, 450, 80, 40
  )

  platform3 = createSprite(
    440, 380, 620, 40
  )

  platform4 = createSprite(
    760, 225, 220, 50
  )

  platform5 = createSprite(
    350, 230, 440, 40
  )

  platform6 = createSprite(
    600, 50, 500, 40
  )

  platform7 = createSprite(
    150, 305, 40, 190
  )

  // platform6 = createSprite(
  //   250, 200, 40, 350
  // )

  death = createSprite(
    600, 670, 0, 0
  )
  death.addImage(fire)

  coneDown = createSprite(
    500, 365, 0, 0
  )
  coneDown.addImage(coneDownImg)

  coneDown2 = createSprite(
    67, 300, 0, 0
  )
  coneDown2.addImage(coneDownImg)

  coneUp = createSprite(
    350, 650, 0, 0
  )
  coneUp.addImage(coneUpImg)

  coneRight = createSprite(
    775, 215, 0, 0
  )
  coneRight.addImage(coneRightImg)

  coneRight2 = createSprite(
    25, 150, 0, 0
  )
  coneRight2.addImage(coneRightImg)

  coneLeft = createSprite(
    925, 0, 0, 0
  )
  coneLeft.addImage(coneLeftImg)

  player = createSprite(  // PLAYER ALWAYS LAST SO SHE'S ABOVE OTHERS
  50, 650, 30, 100);
  player.addImage(rest, 0, 0)
  // player.addAnimation('walk', walkAnim)
  // player.changeAnimation('walk')
  player.setCollider("rectangle", 0, 0, 30, 100)

}

function level3Draw() {

  if (player.overlap(coneUp)) {
    gravityDirection = 'up'
  }

  if (player.overlap(coneDown) || player.overlap(coneDown2)) {
    gravityDirection = 'down'
    player.position.x
  }

  if(player.overlap(coneRight) || player.overlap(coneRight2)) {
    gravityDirection = 'right'
  }

  if (player.overlap(coneLeft)) {
    gravityDirection = 'left'
  }

  if (player.overlap(death)) {
    player.position.x = 50;
    player.position.y = 650;
    gravityDirection = 'down'
    gravitySpeedX = 0
    gravitySpeedY = 0
    die()
  }

  ////////////////////////////////////// BARRIER PHYSICS

  hardRight(platform1)
  hardFloor(platform1)
  platform(platform2)
  platform(platform3)
  platform(platform4)
  platform(platform5)
  platform(platform6)
  platform(platform7)

} //////////////////////////////////////////////// CLOSE L1
