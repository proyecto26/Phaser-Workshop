import Phaser from 'phaser-ce'
import Body from './Body'

export default class extends Body {
  constructor ({ game, x, y, asset, id }) {
    super({ game, x, y, asset, id })

    console.log(`EnemyId: ${id}`)
    /**
     * Prevent movement from collisions
     */
    this.body.moves = false
    /**
     * Static objects like the walls
     */
    this.body.immovable = true
  }
}
