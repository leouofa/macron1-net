import kaboom from "kaboom"

function startGame() {
  const k = kaboom({
    global: true,
    fullscreen: true,
    scale: 2
  })


  // Speeds
  const gravity = 3400
  const moveSpeed = 200
  const jumpForce = 360
  const bigJumpForce = 500
  let currentJumpForce = jumpForce
  const fallDeath = 400
  const enemyDeath = 20

  // Set State
  k.setGravity(gravity)

  // Game Logic
  let isJumping = true

  // Sprites
  k.loadSprite("bean", "sprites/bean.png")
  k.loadSprite("ground", "sprites/ground.gif")

  k.scene("game", ({ level, score }) => {
    const maps = [
      [
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
      ],
      [
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
        'x x  xxxxxx xxxxxxxxxx xxxxxxxxx xxxxxxx',
      ]
    ]

    const levelConfig = {
      tileWidth: 40,
      tileHeight: 40,
      tiles: {
        'x': () => [
          sprite('ground'),
          area(),
          body({ isStatic: true }),
        ],
      }
    }

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

    const gameLevel = k.addLevel(maps[level], levelConfig)

    const scoreLabel = k.add([
      k.text(score),
      k.pos(30, 6),
      { value: score }
    ])

    k.add([
      k.text(`level ${parseInt(level + 1)}`),
      k.pos(100, 6)
    ])


  })


  k.go("game", { level: 0, score: 0 })
}

startGame()
