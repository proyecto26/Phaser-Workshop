import Phaser from 'phaser-ce'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, playerId }) {
    super(game, x, y, asset)

    this.playerId = playerId
    this.checkWorldBounds = true
    this.outOfBoundsKill = true

  }
}
