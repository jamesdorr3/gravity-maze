
const fetchURL = 'http://localhost:3000/'

let level = 1

class Player {
  constructor(id, name, score) {
    this.id = id;
    this.name = name;
    this.score = score;
    Player.all.push(this);
  }
}
Player.all = [];

document.addEventListener('DOMContentLoaded', e => {
  login();
  makeLeaderboard()
})

// ^^ JS SETUP ^^
// vv GAME MECHANICS vv

// GLOBAL VARIABLES

let lives = 3

let gravityDirection = 'down';
let gravityX = 0;
let gravitySpeedX = 0;
let gravityY = 0.3;
let gravitySpeedY = 0;
let jumpUp = 4
let jumpDown = 0
let jumpLeft = 0
let jumpRight = 0

// REQUIRED FUNCTIONS


  function preload() { ////////////////////////////////OPEN PRELOAD
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

} ////////////////////////////////////////////////// CLOSE PRELOAD


  function setup() { //////////////////////////////// OPEN SETUP

  createCanvas(1000, 700);

  door = createSprite(
    940, 400, 50, 85);
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
  player.setCollider("rectangle", 0, 0, 50, 100)
  } //////////////////////////////////////////////// CLOSE SETUP

function draw() { /////////////////////////////// START DRAW
  clear();
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

  if (player.overlap(coneUp) || player.overlap(coneUp2)) {
    gravityDirection = 'up'
  }

  if (player.overlap(coneDown) || player.overlap(coneDown2)) {
    gravityDirection = 'down'
  }

  if (player.overlap(door)) {
    winLevel()
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

} //////////////////////////////////////////////// CLOSE DRAW

//////////////////////////////////////////////// START FUNCTIONS

function makeLeaderboard() {
  fetch(fetchURL + 'highscores')
  .then(r => r.json())
  .then(players => players.forEach (player => {
    new Player(player.player_id, player.player_name, player.hi_score)
  }))
  .then(r =>  Player.all.sort((a, b) => b.score - a.score).forEach (player => {
    document.querySelector('ul.leaderboard').innerHTML += `<li>${player.name} - ${player.score}</li>`}))
}


function login() {
  const body = document.querySelector('body');
  body.innerHTML += `
  <div id="login">
    <form>
      Name:<br>
      <input type="text" name="name" placeholder="Your Unique Name">
      <br>
      <input type="submit" value="Submit">
    </form>
  </div>
  `;
  submitListener();
}

function submitListener() {
  document.getElementById('login').addEventListener('submit', e => {
    e.preventDefault();
    let name = e.target.name.value;
    name ? name : name = 'Butthead';
    findOrCreatePlayer(name);
    document.getElementById('login').remove();
    document.querySelector('.leaderboard h2').innerText = name;
    document.querySelector('h1').innerHTML = `Level 01 x 01 <br/> Lives: ${lives}`
    setTimeout(function() {
      document.querySelector('h1').style.display = 'none'
    }, 300)
  })
}

function test() {
  document.querySelector('h1').style.display = 'none'
}

function findOrCreatePlayer(name) {
  if (Player.all.map(p => p.name).includes(name)) {
    const player_id = Player.all.find(p => p.name === name).id
    document.querySelector('.leaderboard h2').dataset.playerId = player_id
    createGame(player_id)
  }else{
    fetch(fetchURL + 'players', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              Accept: 'application/json'
             },
    body: JSON.stringify({name: name})})
  .then(r => r.json())
  .then(player => {
    document.querySelector('.leaderboard h2').dataset.playerId = player.id;
    createGame(player.id)
  })}
}

function createGame(player_id) {
  fetch(fetchURL + 'games', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
      Accept: 'application/json'},
    body: JSON.stringify({
      player_id: player_id,
      score: 0
    })
  })
  .then(r => r.json())
  .then(game => document.querySelector('.leaderboard h2').dataset.gameId = game.id)
}

////////////////////////////////////////////// GAME FUNCTIONS

function winLevel() {
    document.querySelector('body').innerHTML += `<h1> YOU WIN! </h1>`
    document.querySelector('canvas').remove()
    const gameId = document.querySelector('h2').dataset.gameId
    fetch(fetchURL + `games/${gameId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json',
                Accept: 'application/json'},
      body: JSON.stringify({score: 1})
  })
}

function die() {
  lives -= 1
  if (lives >= 0) {
    document.querySelector('h1').innerHTML = `Level 01 x 01 <br/> Lives: ${lives}`
    document.querySelector('h1').style.display = 'inline'
    setTimeout(function() {
      document.querySelector('h1').style.display = 'none'
    }, 1000)
  }else{
    document.querySelector('h1').innerHTML = `YOU LOSE`
    document.querySelector('h1').style.display = 'inline'
  }
}
