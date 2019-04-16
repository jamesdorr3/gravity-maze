
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
  login();
  makeLeaderboard()
})

let x = 200;
let y = 200;
let gravity = 0.3;


let xSpeed = 0;
let ySpeed = 0;
let gravitySpeed = 0;

function preload() {
  rest = loadImage(fetchURL + 'Fruits_Papaya_2D_Game_Asset/actions/rest/0001.png');
  doorImg = loadImage('http://localhost:3000/moondoor.png')
}

function setup() {
  door = createSprite(
    940, 605, 50, 85);
  door.addImage(doorImg, 0, 0)
  door.scale = .4

  createCanvas(1000, 700);
  player = createSprite(
    x, y, 50, 100);
  player.addImage(rest, 0, 0)
}


function draw() {
  background(0, 255, 0);
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
        y = 0 + 50;}
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
        y = height - 50;}
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

  // if (ell.overlap(upTri)) {
  //   console.log('win')
  // }

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
  })
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
