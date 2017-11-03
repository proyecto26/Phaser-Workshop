import Phaser from 'phaser-ce'

export default class extends Phaser.Weapon {
  constructor (game, player, spriteBullet, fireRate) {
    super(game)

    this.sprite = player

    //  Creates 30 bullets, using the 'bullet' graphic
    this.createBullets(30, spriteBullet)
    //  The bullet will be automatically killed when it leaves the world bounds
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
    //  The speed at which the bullet is fired
    this.bulletSpeed = 600
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.fireRate = fireRate
    this.trackSprite(this.sprite, 0, 0, false)
    //  Fix the position of the bullets to create from the gun
    this.bullets.setAll('anchor.x', -6)
    this.bullets.setAll('anchor.y', 0)
  }

  fire(){
    this.fireAngle = this.sprite.angle - 90
    super.fire()
  }
}
