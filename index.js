
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
let gravityDirection = 'down';

document.addEventListener('DOMContentLoaded', e => {
  // login();
  // makeLeaderboard()
})

let x = 50;
let y = 650;
let gravity = 0.3;


let xSpeed = 0;
let ySpeed = 0;
let gravitySpeed = 0;
var restU;

function preload() {
  rest = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001.png');
  restU = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001u.png');
  restL = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001l.png');
  restR = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001r.png');
  doorImg = loadImage('http://localhost:3000/moondoor.png')
  coneUpImg = loadImage(fetchURL + 'coneUp.png')
  coneDownImg = loadImage(fetchURL + 'coneDown.png')
  coneLeftImg = loadImage(fetchURL + 'coneLeft.png')
  coneRightImg = loadImage(fetchURL + 'coneRight.png')
}

function setup() {
  createCanvas(1000, 700);

  door = createSprite(
    940, 605, 50, 85);
  door.addImage(doorImg, 0, 0)
  door.scale = .4

  coneUp = createSprite(
    500, 630, 10, 70);
  coneUp.addImage(coneUpImg, 0, 0)

  coneDown = createSprite(
    1000, 70, 1, 70);
  coneDown.addImage(coneDownImg, 0, 0)

  coneLeft = createSprite(
    930, 300, 1, 70);
  coneLeft.addImage(coneLeftImg, 0, 0)

  coneRight = createSprite(
    70, 350, 1, 70);
  coneRight.addImage(coneRightImg, 0, 0)

  wall = createSprite(
    650, 300, 5, 100
  );

  player = createSprite(  // PLAYER ALWAYS LAST SO SHE'S ABOVE OTHERS
    x, y, 50, 100);
  player.addImage(rest, 0, 0)

}


function draw() {
  clear();
  background(250, 250, 250, 100);
  fill(0);
  // rect(x,y,50,100);
  // fill(0);
  // rect(360, 320, 40, 80);
  // fill(250)
  // const upTri = triangle (300, 390, 310, 340, 320, 390)
  drawSprites();

  player.position.x = x;
  player.position.y = y;

  //x = x + 1;

  if (keyIsDown(LEFT_ARROW)) {
    x -= 5;
  }
  if(keyIsDown(RIGHT_ARROW)) {
    x += 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    y += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    y -= 5;
  }
  if (keyIsDown(SHIFT)) {
    y -= 5;
  }

  // if (x > 335 && y > 295) {

  // }

  // if (x > 280 && x < 325 && y > 350) {
  //   gravityDirection = 'up'
  // }

  // Gravity
  switch (gravityDirection) {
    case 'down':
      if (x > width - 25){
        x = width - 25;}
      else if (x < 0 + 25){
        x = 0 + 25;}
      else if (y > height - 50) {
        y = height - 50;
        gravitySpeed = 0;}
      else if (y < 0 + 50) {
        y = 0 + 50;
        gravitySpeed = 0;}
      gravitySpeed += gravity;
      x += xSpeed;
      y += ySpeed + gravitySpeed;
      break;
    case 'up':
      if (x > width - 25){
        x = width - 25;}
      else if (x < 0 + 25){
        x = 0 + 25;}
      else if (y > height - 50) {
        y = height - 50;
        gravitySpeed = 0;}
      else if (y < 0 + 50) {
        y = 0 + 50;
        gravitySpeed = 0;}
      gravitySpeed += gravity;
      x += xSpeed;
      y -= ySpeed + gravitySpeed;
      break;
    case 'left':
      if (x > width - 25){
        x = width - 25;
        gravitySpeed = 0;}
      else if (x < 0 + 25){
        x = 0 + 25;
        gravitySpeed = 0;}
      else if (y > height - 50) {
        y = height - 50;}
      else if (y < 0 + 50) {
        y = 0 + 50;}
      gravitySpeed += gravity;
      x -= xSpeed + gravitySpeed;
      y += ySpeed;
      break;
    case 'right':
      if (x > width - 25){
        x = width - 25;
        gravitySpeed = 0;}
      else if (x < 0 + 25){
        x = 0 + 25;
        gravitySpeed = 0;}
      else if (y > height - 50) {
        y = height - 50;}
      else if (y < 0 + 50) {
        y = 0 + 50;}
      gravitySpeed += gravity;
      x += xSpeed + gravitySpeed;
      y += ySpeed;
      break;
  }

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

  if (player.overlapPoint(950, 690)) {
    console.log('You win!')
  }

  if (player.collide(wall)) {
    ySpeed = 0;
    xSpeed = 0;
    gravitySpeed = 0
  }

}


// function keyPressed() {
//   if (keyCode === (UP_ARROW)) {
//     y = y - 50;
//   } else if (keyCode === DOWN_ARROW) {
//    y = y + 50;
//   }
//   if (keyCode === LEFT_ARROW) {
//     x = x - 50;
//   } else if (keyCode === RIGHT_ARROW) {
//     x = x + 50;
//   }

// }

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
    setTimeout(function() {
      document.querySelector('h1').style.display = 'none'
    }, 3000)
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
