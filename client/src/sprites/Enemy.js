import Phaser from 'phaser-ce'
import Body from './Body'

export default class extends Body {
  constructor ({ game, x, y, asset, id }) {
    super({ game, x, y, asset, id })

    /**
     * Prevent movement from collisions
     */
    this.body.moves = false
    /**
     * Static objects like the walls
     */
    this.body.immovable = true
  }

  updateStatus({ id, x, y, legsAngle, legsFrame, torsoFrame }){
    this.x = x
    this.y = y
    this.legs.angle = legsAngle
    this.legs.frame = legsFrame
    this.torso.frame = torsoFrame
  }
}
