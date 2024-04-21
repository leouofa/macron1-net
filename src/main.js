import kaboom from "kaboom"

const k = kaboom({
  fullscreen: true,
  scale: 2
})

k.setGravity(3400)

// Sprites
k.loadSprite("bean", "sprites/bean.png")
k.loadSprite("ground", "sprites/ground.gif")

// Speeds
const moveSpeed = 200
const jumpForce = 360
const bigJumpForce = 500
let currentJumpForce = jumpForce
const fallDeath = 400
const enemyDeath = 20

// Game Logic
let isJumping = true


const player = k.add([
  k.sprite("bean"),
  k.scale(0.5),
  k.pos(20, 20),
  k.area(),
  k.body()
])

// Actions
k.onKeyDown('right', () => {
  player.move(moveSpeed, 0)
})

k.onKeyDown('left', () => {
  player.move(-moveSpeed, 0)
})

k.onKeyDown('space', () => {
  player.jump()
})

k.addLevel([
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '     x                                  ',
  '                                        ',
  '     x   @       @  @         @     @   ',
  '                                        ',
  'xxxx xxxxxx xxxxxxxxxx xxxxxxxxx xxxxxxx',

], {
  tileWidth: 40,
  tileHeight: 40,
  tiles: {
    'x': () => [
      sprite('ground'),
      area(),
      body({ isStatic: true }),
    ],
  }
})
