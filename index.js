
const fetchURL = 'http://localhost:3000/'
document.addEventListener('DOMContentLoaded', e => {
  login();
  makeLeaderboard()
})

let x = 200;
let y = 200;



function setup() {
  createCanvas(400, 400);

}


function draw() {

  background(250);
  fill(0);
  ellipse(x,y,50,50);
  rect(350,350,50,50);


  //x = x + 1;

  if (x >= width){
   x = width;
 }
   if (x <= 0){
    x = 0;
  }
  if (y >= height) {
    y = height;
  }
  if (y <= 0) {
    y = 0;
  };
  // ellipse(a,b,30,30);
  //
  // //x = x + 1;
  //
  // if (a >= width){
  //  a = width;
  // }
  //  if (a <= 0){
  //   a = 0;
  // }
  // if (b >= height) {
  //   b = height;
  // }
  // if (b <= 0) {
  //   b = 0;
  // }
}

function keyPressed() {
  if (keyCode === 87) {
    y = y - 50;
  } else if (keyCode === 83) {
   y = y + 50;
  }
  if (keyCode === 65) {
    x = x - 50;
  } else if (keyCode === 68) {
    x = x + 50;
  }
  // if (keyCode === UP_ARROW) {
  //   b = b - 50;
  // } else if (keyCode === DOWN_ARROW) {
  //  b = b + 50;
  // }
  // if (keyCode === LEFT_ARROW) {
  //   a = a - 50;
  // } else if (keyCode === RIGHT_ARROW) {
  //   a = a + 50;
  // }

}

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

class Player {
  constructor(id, name, score) {
    this.id = id;
    this.name = name;
    this.score = score;
    Player.all.push(this);
  }
}
Player.all = [];

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
