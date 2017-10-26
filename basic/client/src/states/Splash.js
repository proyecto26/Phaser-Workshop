import Phaser from 'phaser-ce'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])
    this.load.setPreloadSprite(this.loaderBar)

    /**
     * Load resources from other domain (CORS is required)
     */
    //this.load.baseURL = 'http://www.nicholls.co/'
    //this.load.crossOrigin = 'anonymous'
    
    /**
     * Load the assets
     */
    this.load.image('level1', 'assets/images/level1.jpg')

    this.load.image('bullet', 'assets/images/bullet.png')
    this.load.spritesheet('player', 'assets/images/player.png', 80, 90)
    this.load.spritesheet('legs', 'assets/images/legs.png', 80, 100)

    this.load.audio('music', ['assets/audios/music.ogg', 'assets/audios/music.mp3'])
    this.load.audio('shoot', ['assets/audios/shoot.ogg', 'assets/audios/shoot.mp3'])
  }

  create () {
    this.state.start('Game')
  }
}
