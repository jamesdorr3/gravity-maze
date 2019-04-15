const gamescreen = document.getElementById('gamescreen')
const ctx = gamescreen.getContext('2d')
const playerHeight = 80
const playerWidth = 80
let playerX = 0

ctx.beginPath()
ctx.rect(0, 420, 80, 80)
ctx.fillStyle = "lime"
ctx.fill()
ctx.closePath()


ctx.beginPath()
ctx.rect(420, 420, 80, 80)
ctx.fillStyle = "red"
ctx.fill()
ctx.closePath()

document.addEventListener('keydown', e => {
  if (e.which == 37) {
    playerX -= 7
  }
  else if (e.which == 39) {
    playerX += 7
  }


})
