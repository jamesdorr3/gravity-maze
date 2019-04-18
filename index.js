
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
  // login();
  // makeLeaderboard()
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
    level1Preload()
} ////////////////////////////////////////////////// CLOSE PRELOAD


function setup() { //////////////////////////////// OPEN SETUP
  level1Setup()
} //////////////////////////////////////////////// CLOSE SETUP

function draw() { /////////////////////////////// START DRAW
  level1Draw()
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
