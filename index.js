document.addEventListener('DOMContentLoaded', e => {
  makeLeaderboard()
})

var x = 200;
var y = 200;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250);
  fill(0);
  ellipse(x,y,50,50);

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
  }

}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    y = y - 50;
  } else if (keyCode === DOWN_ARROW) {
   y = y + 50;
  }
  if (keyCode === LEFT_ARROW) {
    x = x - 50;
  } else if (keyCode === RIGHT_ARROW) {
    x = x + 50;
  }

}

function makeLeaderboard() {
  fetch('http://localhost:3000/leaderboard')
  .then(r => r.json())
  .then(players => players.forEach (player => {
    document.querySelector('ul.leaderboard').innerHTML += `<li>${player.name} - ${player.score}`
  }))
}

