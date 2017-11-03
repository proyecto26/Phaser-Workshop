/**
 * Phaser Real-Time Template
 * @author       Juan Nicholls <jdnichollsc@hotmail.com>
 * @copyright    2017 Proyecto 26 - https://github.com/proyecto26/Phaser-Workshop
 * @license      {@link http://opensource.org/licenses/MIT}
 * @version 1.0.0
 */

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const _ = require('lodash')
const PlayerManager = require('./managers/player')
const GameManager = require('./managers/game')

var gameInterval = null
const gameWorld = {
  players: [],
  bullets: [],
  timeout: 200
}
var gameManager = new GameManager(io, gameWorld)

io.on('connection', (socket) => {
  let playerManager = new PlayerManager(socket, gameWorld)
  socket.on('disconnect', () => {
    playerManager.deletePlayer()
    io.emit('player.disconnect', socket.id)
  })
})

server.listen(process.env.PORT || 8081, () => {
  console.log('Listening on '+server.address().port)
  gameInterval = gameManager.createGameInterval()
})