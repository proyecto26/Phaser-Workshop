import Phaser from 'phaser-ce'

export default class extends Phaser.Text {
  constructor ({ game, x, y, text }) {
    super(game, x, y, text)

    this.font = 'Bangers'
    this.padding.set(10, 16)
    this.fontSize = 70
    this.fill = '#77BFA3'
    this.smoothed = false
    this.anchor.setTo(0.5)
    this.wordWrap = true
    this.wordWrapWidth = 500
    this.align = 'center'
  }
}
