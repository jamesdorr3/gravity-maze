function level4Setup() {

  platform1 = createSprite(
    900, 225, 200, 40
  )

  platform2 = createSprite(
    300, 125, 40, 250
  )
  // platform2.visible = false

  platform3 = createSprite(
    200, 300, 80, 40
  )
  // platform3.visible = false

  platform4 = createSprite(
    400, 400, 80, 40
  )
  // platform4.visible = false

  platform5 = createSprite(
    800, 300, 40, 40
  )
  // platform5.visible = false

  platform6 = createSprite (
    900, 400, 40, 80
  )
  // platform6.visible = false
  
  platform7 = createSprite(
    800, 175, 40, 80
  )
  // platform7.visible = false

  coneUp = createSprite(
    50, 500, 0, 0
    )
  coneUp.addImage(coneUpImg)
  // coneUp.visible = false

  coneDown = createSprite(
    225, 50, 0, 0
    )
  coneDown.addImage(coneDownImg)
  // coneDown.visible = false

  coneDown2 = createSprite(
    450, 150, 100, 300)
  // coneDown2.visible = false

  coneRight = createSprite(
    500, 400, 0, 0
    )
  coneRight.addImage(coneRightImg)
  // coneRight.visible = false

  coneLeft = createSprite(
    750, 175, 40, 80
    )
  // coneLeft.addImage(coneLeftImg)
  // coneLeft.visible = false

  
  death = createSprite(
    750, 670, 0, 0
  )
  death.addImage(fire)

  door = createSprite (
    900, 100, 0, 0
  )
  door.addImage(doorImg)
  door.scale = .4

  player = createSprite(  // PLAYER ALWAYS LAST SO SHE'S ABOVE OTHERS
  50, 650, 30, 100);
  player.addImage(rest, 0, 0)
  // player.addAnimation('walk', walkAnim)
  // player.changeAnimation('walk')
  player.setCollider("rectangle", 0, 0, 30, 100)

}

function level4Draw() {

  if (player.overlap(death)) {
    player.position.x = 500;
    player.position.y = 50;
    gravityDirection = 'down'
    gravitySpeedX = 0
    gravitySpeedY = 0
    die()
  }

  if (player.overlap(coneUp)) {
    gravityDirection = 'up'
  }
  if (player.overlap(coneDown) || player.overlap(coneDown2)) {
    gravityDirection = 'down'
  }
  if (player.overlap(coneRight)) {
    gravityDirection = 'right'
  }
  if (player.overlap(coneLeft)) {
    gravityDirection = 'left'
  }

  platform(platform1)
  hardRight(platform2)
  platform(platform3)
  platform(platform4)
  platform(platform5)
  hardRight(platform6)
  platform(platform7)
  ////////////////////////////////////// BARRIER PHYSICS

} //////////////////////////////////////////////// CLOSE L1
