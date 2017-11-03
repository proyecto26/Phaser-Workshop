/* globals __DEV__ */
import Phaser from 'phaser-ce'
import * as io from 'socket.io-client'
import config from '../config'
import _ from 'lodash'

import Player from '../sprites/Player'
import Enemy  from '../sprites/Enemy'
import Weapon from '../sprites/Weapon'
import Banner from '../texts/Banner'
import Hud    from '../addons/Hud'

export default class extends Phaser.State {
  init () {
    this.socket = io.connect(config.serverUrl)
    this.socket.emit('player.newPlayer', 'username')
    this.socket.on('player.created', this.playerCreated.bind(this))
    this.socket.on('player.enemyCreated', this.createEnemy.bind(this))
    this.socket.on('player.disconnect', this.destroyPlayer.bind(this))
    this.socket.on('game.state', this.updateGame.bind(this))
  }
  /**
   * Load dynamic assets per level
   */
  preload () {}

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.physics.arcade.checkCollision.down = true

    let level = this.add.image(0, 0, 'level1')
    /**
     * We can get data from the cache
     */
    let cacheImage = this.game.cache.getImage('level1')
    this.game.world.setBounds(0, 0, cacheImage.width, cacheImage.height)

    this.banner = new Banner({ 
      game: this.game, 
      x: this.world.centerX, 
      y: this.game.height - 180,
      text: 'Phaser\nRealtime games! '
    })
    this.game.add.existing(this.banner)

    this.enemies = this.game.add.group()
    this.enemies.enableBody = true

    this.music = this.game.add.audio('music')
    this.music.loop = true
    //this.music.play()
    this.shootingSound = this.game.add.audio('shoot')
    this.spaceButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    this.hud = new Hud(this.game)
  }

  update () {
    if(!this.player) return
    this.game.physics.arcade.collide(this.player, this.enemies)

    if(this.spaceButton.isDown){
      this.player.isFiring = true
      this.weapon.fire()
    }
    else{
      this.player.isFiring = false
    }

    var currentPlayerStatus = this.player.getStatus()
    if(!_.isEqual(this.currentPlayerStatus, currentPlayerStatus)){
      this.currentPlayerStatus = currentPlayerStatus
      this.socket.emit('player.movement', currentPlayerStatus)
    }
  }

  newShot(){
    this.shootingSound.play()
  }

  playerCreated ({ player, enemies }){
    this.player = new Player({
      game: this.game,
      x: player.x,
      y: player.y,
      asset: 'player',
      id: player.id
    })
    this.hud.setName(this.player, player.id)
    this.weapon = new Weapon(this.game, this.player.spriteToTrack(), 'bullet', 300)
    this.weapon.onFire.add(this.newShot, this)

    _.forEach(enemies, (enemy) => this.createEnemy(enemy))
  }

  createEnemy ({ id, x, y, legsAngle = 0 }){
    var newEnemy = this.enemies.add(new Enemy({
      game: this.game,
      x: x,
      y: y,
      asset: 'player',
      id: id
    }))
    this.hud.setName(newEnemy, id)
    newEnemy.legs.angle = legsAngle
  }

  updateEnemy (player){
    let enemy = _.find(this.enemies.children, { id: player.id })
    if(enemy){
      enemy.updateStatus(player)
    }
  }

  updateGame ({ players = [], bullets = [] }){
    /**
     * Update entities of the world
     */
    _.forEach(players , player => this.updateEnemy(player))
  }

  destroyPlayer (playerId){
    if(this.player.id === playerId){
      this.player.destroy()
      alert('The connection with the server was closed! :(')
    }
    else{
      let enemy = _.find(this.enemies.children, { id: playerId })
      if(enemy){
        enemy.destroy()
      }
    }
  }

  render () {
    if (__DEV__) {
      if(this.player){
        this.game.debug.spriteInfo(this.player, 32, 32)
        this.game.debug.body(this.player)
      }
      this.enemies.forEachAlive(function(enemy){
        this.game.debug.body(enemy, 'rgba(255, 0, 0, 0.5)');
      }, this)
    }
  }
}
