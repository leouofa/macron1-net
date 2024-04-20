import kaboom from "kaboom"

const k = kaboom()

k.setGravity(3400)

// Sprites
k.loadSprite("bean", "sprites/bean.png")

// Speeds
const MOVE_SPEED = 200

const player = k.add([
  k.sprite("bean"),
  k.scale(0.5),
  k.pos(20, 20),
  k.area(),
  k.body()
])

// Actions
k.onKeyDown('right', () => {
  player.move(MOVE_SPEED, 0)
})

k.onKeyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
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
  '     x                                  ',
  '                                        ',
  '     x   @       @  @         @     @   ',
  '                                        ',
  'xx   xxxxxx xxxxxxxxxx xxxxxxxxx xxxxxxx',

], {
  tileWidth: 40,
  tileHeight: 40,
  tiles: {
    'x': () => [
      sprite('bean'),
      area(),
      body({ isStatic: true }),
      scale(0.5)
    ],
  }
})
