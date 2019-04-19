function level5Setup() {

  death = createSprite(
    250, 670, 0, 0
  )
  death.addImage(fire)

  death2 = createSprite(
    750, 670, 0, 0
  )
  death2.addImage(fire)

  door = createSprite (
    900, 100, 0, 0
  )
  door.addImage(doorImg)
  door.scale = .4

  player = createSprite(  // PLAYER ALWAYS LAST SO SHE'S ABOVE OTHERS
  500, 50, 30, 100);
  player.addImage(rest, 0, 0)
  // player.addAnimation('walk', walkAnim)
  // player.changeAnimation('walk')
  player.setCollider("rectangle", 0, 0, 30, 100)

}

function level5Draw() {

  if (player.overlap(death) || player.overlap(death2)) {
    player.position.x = 500;
    player.position.y = 50;
    gravityDirection = 'down'
    gravitySpeedX = 0
    gravitySpeedY = 0
    die()
  }

  ////////////////////////////////////// BARRIER PHYSICS

} //////////////////////////////////////////////// CLOSE L1
