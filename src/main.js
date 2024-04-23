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
  const jumpForce = 560
  const bigJumpForce = 500
  let currentJumpForce = jumpForce
  const fallDeath = 4000
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
        'w                                       ',
        'w                                       ',
        'w                                       ',
        'w                                       ',
        'w                                       ',
        'w                                       ',
        'w                                       ',
        'w    x                                  ',
        'w                                       ',
        'w    x   @       @  @         @     @   ',
        'w                                      g',
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
        'w': () => [
          sprite('ground'),
          area(),
          body({ isStatic: true }),
        ],
        'g': () => [
          sprite('ground'),
          area(),
          body({ isStatic: true }),
          'gate'
        ],
      }
    }

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

    const player = k.add([
      k.sprite("bean"),
      k.scale(0.5),
      k.pos(80, 20),
      k.area(),
      k.body(),
      k.anchor("bot"),
      "player"
    ])

    // Actions
    k.onKeyDown('right', () => {
      player.move(moveSpeed, 0)
    })

    k.onKeyDown('left', () => {
      player.move(-moveSpeed, 0)
    })

    k.onKeyPress('space', () => {
      if (player.isGrounded()) {
        isJumping = true
        player.jump(currentJumpForce)
      }
    })

    k.onUpdate("player", (player) => {
      if (player.isGrounded()) {
        isJumping = false
      }
    })

    k.onUpdate("player", (player) => {
      k.camPos(player.pos)
      if (player.pos.y >= fallDeath) {
        k.go('lose', { score: scoreLabel.value })
      }
    })

    scene('lose', ({ score }) => {
      add([
        k.text(score, 32),
        k.anchor('center'),
        k.pos(width() / 2, height() / 2)
      ])

    })

    player.onCollide('gate', () => {
      k.go('game', {
        level: (level + 1),
        score: scoreLabel.value
      })
    })


  })


  k.go("game", { level: 0, score: 0 })
}

startGame()
