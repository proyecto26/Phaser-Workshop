/* globals __DEV__ */
import Phaser from 'phaser-ce'
import * as io from 'socket.io-client'
import config from '../config'
import _ from 'lodash'

import Player from '../sprites/Player'
import Enemy  from '../sprites/Enemy'
import Banner from '../texts/Banner'

export default class extends Phaser.State {
  init () {
    this.socket = io.connect(config.serverUrl)
    this.socket.emit('player.newPlayer', 'username')
    this.socket.on('player.created', this.playerCreated.bind(this))
    this.socket.on('player.enemyCreated', this.createEnemy.bind(this))
    this.socket.on('player.disconnect', this.destroyPlayer.bind(this))
    this.socket.on('enemy.disconnect', this.destroyEnemy.bind(this))
    this.socket.on('enemy.position', this.updateEnemy.bind(this))
    this.lastTimeSocketCaptured = 0
    this.socketDelay = 1/60
  }
  /**
   * Load dynamic assets per level
   */
  preload () {}

  create () {

    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    let level = this.add.image(0, 0, 'level1')
    level.scale.set(0.8)
    this.game.world.setBounds(0, 0, level.width, level.height-50)

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

    this.playerLastPosition = {}
  }

  update () {
    if(!this.player) return

    this.game.physics.arcade.collide(this.player, this.enemies)

    var currentPlayerPosition = {
      x: this.player.x,
      y: this.player.y,
      legsAngle: this.player.legs.angle,
      legsFrame: this.player.legs.frame,
      torsoFrame: this.player.torso.frame
    }

    if(this.game.time.now > this.lastTimeSocketCaptured && 
      !_.isEqual(this.playerLastPosition, currentPlayerPosition)){
      this.lastTimeSocketCaptured = this.game.time.now + this.socketDelay
      this.socket.emit('player.movement', currentPlayerPosition)
    }
  }

  playerCreated ({ player, enemies }){
    this.player = new Player({
      game: this.game,
      x: player.x,
      y: player.y,
      asset: 'player',
      id: player.id
    })
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
    newEnemy.legs.angle = legsAngle
  }

  updateEnemy ({ id, x, y, legsAngle, legsFrame, torsoFrame }){
    let enemy = _.find(this.enemies.children, { id: id })
    if(enemy){
      enemy.x = x
      enemy.y = y
      enemy.legs.angle = legsAngle
      enemy.legs.frame = legsFrame
      enemy.torso.frame = torsoFrame
      console.log(`player: ${this.player.id}, enemy: ${id}`)
    }
  }

  destroyPlayer (){
    this.player.destroy()
    alert('Ohh no, you are disconnected!')
  }

  destroyEnemy (playerId){
    let enemy = _.find(this.enemies.children, { id: playerId })
    if(enemy){
      enemy.destroy()
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