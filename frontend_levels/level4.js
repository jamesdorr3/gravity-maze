function level4Preload() {
  rest = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001.png');
  // walkAnim = loadAnimation( `/Fruits_Papaya_2D_Game_Asset/actions/run/0001.png`,
  // `/Fruits_Papaya_2D_Game_Asset/actions/run/0029.png`
  // )
  restL = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001l.png');

  // restR = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001r.png');
  // restDown = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001u.png');
  // restR = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001r.png');

  fire = loadImage(fetchURL + 'fire.png');

  doorImg = loadImage('http://localhost:3000/moondoor.png')
  coneUpImg = loadImage(fetchURL + 'coneUp.png')
  coneDownImg = loadImage(fetchURL + 'coneDown.png')
  coneLeftImg = loadImage(fetchURL + 'coneLeft.png')
  coneRightImg = loadImage(fetchURL + 'coneRight.png')
}

function level4Setup() {

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

function level4Draw() {

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
