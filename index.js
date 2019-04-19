
const fetchURL = 'http://localhost:3000/'

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
let level = 0

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
  restL = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001l.png');

  fire = loadImage(fetchURL + 'fire.png');

  doorImg = loadImage('http://localhost:3000/moondoor.png')
  coneUpImg = loadImage(fetchURL + 'coneUp.png')
  coneDownImg = loadImage(fetchURL + 'coneDown.png')
  coneLeftImg = loadImage(fetchURL + 'coneLeft.png')
  coneRightImg = loadImage(fetchURL + 'coneRight.png')
  switch (level) {
    case 0:
      level0Preload()
      break
    case 1:
      level1Preload()
      break
    case 2:
      level2Preload()
      break
    case 3:
      level3Preload()
      break
    case 4:
      level4Preload()
      break
  }
} ////////////////////////////////////////////////// CLOSE PRELOAD


function setup() { //////////////////////////////// OPEN SETUP
  createCanvas(1000, 700);

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

  switch (level) {
    case 0:
      level0Setup()
      break
    case 1:
      level1Setup()
      break
    case 2:
      coneUp.remove()
      coneUp2.remove()
      coneDown.remove()
      coneDown2.remove()
      player.remove()
      door.remove()
      death.remove()
      deathPic.remove()
      platformLeft.remove()
      platformRight.remove()
      level2Setup()
      break
    case 3:
      player.remove()
      door.remove()
      level3Setup()
      break
    case 4:
      player.remove()
      door.remove()
      platform1.remove()
      platform2.remove()
      platform3.remove()
      platform4.remove()
      platform5.remove()
      platform6.remove()
      platform7.remove()
      coneUp.remove()
      coneDown.remove()
      coneDown2.remove()
      coneLeft.remove()
      coneRight.remove()
      coneRight2.remove()
      death.remove()
      level4Setup()
      break
  }
} //////////////////////////////////////////////// CLOSE SETUP

function draw() { /////////////////////////////// START DRAW
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
  switch (level) {
    case 0:
      level0Draw()
      break
    case 1:
      level1Draw()
      break
    case 2:
      level2Draw()
      break
    case 3:
      level3Draw()
      break
    case 4:
      level4Draw()
      break
  }
  
} //////////////////////////////////////////////// CLOSE DRAW

////////////////////////////////////////////// BARRIER PHYSICS FUNCTIONS

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


function winLevel() {
    document.querySelector('body').innerHTML += `<h1> YOU WIN! </h1>`
    document.querySelector('canvas').remove()
    const gameId = document.querySelector('h2').dataset.gameId
    fetch(fetchURL + `games/${gameId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json',
                Accept: 'application/json'},
      body: JSON.stringify({score: level})
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
    const gameId = document.querySelector('h2').dataset.gameId
    fetch(fetchURL + `games/${gameId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json',
                Accept: 'application/json'},
      body: JSON.stringify({score: level})
    })
    document.querySelector('h1').innerHTML = `YOU LOSE`
    document.querySelector('h1').style.display = 'inline'
  }
}
