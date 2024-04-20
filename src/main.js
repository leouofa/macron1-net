import kaboom from "kaboom"

const k = kaboom()

k.setGravity(2400)

k.loadSprite("bean", "sprites/bean.png")

const player = k.add([
  k.sprite("bean"),
  k.scale(0.5),
  k.pos(20, 20),
  k.area(),
  k.body()
])

const MOVE_SPEED = 200
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
  '                                        ',
  '                                        ',
  '         @       @  @         @     @   ',
  '                                        ',
  'xx   xxxxxx xxxxxxxxxx xxxxxxxxx xxxxxxx',

], {
  tileWidth: 40,
  tileHeight: 40,
  tiles: {
    'x': () => [
      sprite('bean'),
      area(),
      body({ isStatic: true })
    ],
  }
})



// k.loadSprite("bean", "sprites/bean.png")
//
// k.add([
//   k.pos(120, 120),
//   k.scale(1.5),
//   k.sprite("bean"),
// ])
//
// k.onClick(() => k.addKaboom(k.mousePos()))
