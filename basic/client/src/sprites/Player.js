import Phaser from 'phaser-ce'
import Body from './Body'

export default class extends Body {
  constructor ({ game, x, y, asset, id }) {
    super({ game, x, y, asset, id })

    this.maxSpeed = 300
    this.shootingRate = 200
    this.lastTimeShot = 0
    console.log(`PlayerId: ${id}`)

    game.camera.follow(this)

    /**
     * Capture the cursor and the keyboard keys
     */
    this.cursor = game.input.keyboard.createCursorKeys()
    this.spaceButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.wasd = {
      up:    game.input.keyboard.addKey(Phaser.Keyboard.W),
      left:  game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
      down:  game.input.keyboard.addKey(Phaser.Keyboard.S)
    }

    this.shootingSound = game.add.audio('shoot')
  }

  update () {
    super.update()
    this.body.velocity.x = 0
    this.body.velocity.y = 0
    this.legs.body.angularVelocity = 0

    if (this.cursor.left.isDown || this.wasd.left.isDown)
      this.legs.body.angularVelocity = -this.maxSpeed
    else if (this.cursor.right.isDown || this.wasd.right.isDown)
      this.legs.body.angularVelocity = this.maxSpeed

    var direction = null
    if (this.cursor.up.isDown || this.wasd.up.isDown) direction = 1
    if (this.cursor.down.isDown || this.wasd.down.isDown) direction = -1

    if(direction){
      var angle = this.legs.angle - 90
      this.game.physics.arcade.velocityFromAngle(angle, direction * this.maxSpeed, this.body.velocity)

      this.torso.animations.play('walk')
      this.legs.animations.play('walk')
    }
    else{
      this.torso.animations.stop()
      this.legs.animations.stop()
      this.torso.frame = 2
      this.legs.frame = 0
    }

    if(this.spaceButton.isDown){
      this.torso.animations.stop()
      this.torso.frame = 0
      if(this.game.time.now > this.lastTimeShot){
        this.lastTimeShot = this.game.time.now + this.shootingRate
        this.newShot()
      }
    }
  }

  newShot(){
    this.shootingSound.play()
  }
}
