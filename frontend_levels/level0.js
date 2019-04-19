function level0Preload() {
  // rest = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001.png');
  // restL = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001l.png');

  // fire = loadImage(fetchURL + 'fire.png');

  // doorImg = loadImage('http://localhost:3000/moondoor.png')
  // coneUpImg = loadImage(fetchURL + 'coneUp.png')
  // coneDownImg = loadImage(fetchURL + 'coneDown.png')
  // coneLeftImg = loadImage(fetchURL + 'coneLeft.png')
  // coneRightImg = loadImage(fetchURL + 'coneRight.png')
}

function level0Setup() {

  createCanvas(1000, 700);

  door = createSprite(
    940, 350, 50, 85);
  door.addImage(doorImg, 0, 0)
  door.scale = .4

  coneUp = createSprite(
    300, 650, 10, 70);
  coneUp.addImage(coneUpImg, 0, 0)

  coneRight = createSprite(
    70, 350, 1, 70);
  coneRight.addImage(coneRightImg, 0, 0)
    
  coneDown = createSprite(
    300, 50, 1, 70);
  coneDown.addImage(coneDownImg, 0, 0)
      
  coneLeft = createSprite(
    600, 350, 1, 70);
  coneLeft.addImage(coneLeftImg, 0, 0)

  player = createSprite(  // PLAYER ALWAYS LAST SO SHE'S ABOVE OTHERS
  500, 650, 30, 100);
  player.addImage(rest, 0, 0)
  // player.addAnimation('walk', walkAnim)
  // player.changeAnimation('walk')
  player.setCollider("rectangle", 0, 0, 50, 100)
}

function level0Draw() {

  if (player.overlap(coneUp)) {
    gravityDirection = 'up'
  }

  if (player.overlap(coneDown)) {
    gravityDirection = 'down'
  }

  if (player.overlap(coneLeft)) {
    gravityDirection = 'left'
  }

  if (player.overlap(coneRight)) {
    gravityDirection = 'right'
  }
  
  ////////////////////////////////////// BARRIER PHYSICS
  
} //////////////////////////////////////////////// CLOSE L1
