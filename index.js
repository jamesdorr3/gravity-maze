
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
  // restU = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001u.png');
  // restL = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001l.png');
  // restR = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001r.png');
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
    275, 550, 10, 70);
  coneUp.addImage(coneUpImg, 0, 0)

  coneDown = createSprite(
    950, 70, 1, 70);
  coneDown.addImage(coneDownImg, 0, 0)

  // coneLeft = createSprite(
  //   930, 300, 1, 70);
  // coneLeft.addImage(coneLeftImg, 0, 0)

  // coneRight = createSprite(
  //   70, 350, 1, 70);
  // coneRight.addImage(coneRightImg, 0, 0)

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
    150, 375, 300, 40
  );

  platformRight = createSprite(
    850, 500, 300, 40
  );

  death = createSprite(
    500, 675, 1000, 50
  );

    
  player = createSprite(  // PLAYER ALWAYS LAST SO SHE'S ABOVE OTHERS
  50, 50, 50, 100);
  player.addImage(rest, 0, 0)
  player.setCollider("rectangle", 0, 0, 50, 100)
  } //////////////////////////////////////////////// CLOSE SETUP
  
  
function draw() { /////////////////////////////// START DRAW
  clear();
  background(250, 250, 250, 100);
  drawSprites();

  if (keyIsDown(LEFT_ARROW)) {
    player.mirrorX(-1)
    player.position.x -= (5 + jumpLeft);
  }
  if(keyIsDown(RIGHT_ARROW)) {
    player.mirrorX(1)
    player.position.x += (5 + jumpRight);
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.position.y += (5 + jumpDown);
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(SHIFT)) {
    player.position.y -= (5 + jumpUp);
  }


  //////////////////////////////////////// Gravity
  gravitySpeedX += gravityX
  gravitySpeedY += gravityY
  player.position.x += gravitySpeedX
  player.position.y += gravitySpeedY
  if (gravityDirection === 'down') {
    player.mirrorY(1)
    gravityY = 0.3;
    gravityX = 0;
    gravitySpeedX = 0;
    jumpDown = 0;
    jumpUp = 4;
    jumpLeft = 0;
    jumpRight = 0;
  }
  else if (gravityDirection === 'up') {
    player.mirrorY(-1)
    gravityY = -0.3;
    gravityX = 0;
    gravitySpeedX = 0;
    jumpDown = 4;
    jumpUp = 0;
    jumpLeft = 0;
    jumpRight = 0;
  }
  else if (gravityDirection === 'right') {
    gravityY = 0;
    gravityX = 0.3;
    gravitySpeedY = 0;
    jumpDown = 0;
    jumpUp = 0;
    jumpLeft = 4;
    jumpRight = 0;
  }
  else if (gravityDirection === 'left') {
    gravityY = 0;
    gravityX = -0.3;
    gravitySpeedY = 0;
    jumpDown = 0;
    jumpUp = 0;
    jumpLeft = 0;
    jumpRight = 4;
  }

  if (player.overlap(coneUp)) {
    gravityDirection = 'up'
  }

  if (player.overlap(coneDown)) {
    gravityDirection = 'down'
  }

  if (player.overlap(door)) {
    winLevel()
  }

  if (player.overlap(death)) {
    player.position.x = 50;
    player.position.y = 50;
    player.position.x = 50;
    player.position.y = 50;
    gravityDirection = 'down'
    gravitySpeedX = 0
    gravitySpeedY = 0
    die()
  }

  ////////////////////////////////////// BARRIER PHYSICS

  function hardFloor(sprite) {
    if ( // down
      player.position.x + 15 > sprite.position.x - (sprite._internalWidth / 2) && 
      player.position.x - 15 < sprite.position.x + (sprite._internalWidth / 2) && 
      player.position.y + 50 >= sprite.position.y - (sprite._internalHeight /2) &&
      player.position.y + 50 <= sprite.position.y
    ){
      player.position.y = sprite.position.y - (sprite._internalHeight / 2) - 50;
      (gravityDirection === 'down') ? gravitySpeedY = 0 : 0;
    }
  }
  function hardRight(sprite) {
    if ( // left
      player.position.y + 50 > sprite.position.y - (sprite._internalHeight / 2) &&
      player.position.y - 50 < sprite.position.y + (sprite._internalHeight / 2) && 
      player.position.x + 15 >= sprite.position.x - (sprite._internalWidth / 2) &&
      player.position.x + 15 <= sprite.position.x
      ){
        player.position.x = sprite.position.x - (sprite._internalWidth / 2) - 15;
        (gravityDirection === 'right') ? gravitySpeedX = 0 : 0;
    }
  }
  function hardLeft(sprite) {
    if ( // right
      player.position.y + 50 > sprite.position.y - (sprite._internalHeight / 2) &&
      player.position.y - 50 < sprite.position.y + (sprite._internalHeight / 2) && 
      player.position.x - 15 <= sprite.position.x + (sprite._internalWidth / 2) &&
      player.position.x - 15 >= sprite.position.x
      ){
        player.position.x = sprite.position.x + (sprite._internalWidth / 2) + 15;
        (gravityDirection === 'left') ? gravitySpeedX = 0 : 0;
    }
  }
  function hardCeiling(sprite) {
    if ( // up
      player.position.x + 15 > sprite.position.x - (sprite._internalWidth / 2) && 
      player.position.x - 15 < sprite.position.x + (sprite._internalWidth / 2) && 
      player.position.y - 50 <= sprite.position.y + (sprite._internalHeight /2) &&
      player.position.y - 50 >= sprite.position.y //- (sprite._internalHeight /2)
    ){
      player.position.y = sprite.position.y + (sprite._internalHeight / 2) + 50;
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
  setTimeout(function() {
    document.querySelector('body').innerHTML += `<h1> YOU WIN! </h1>`
  }, 500)
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
