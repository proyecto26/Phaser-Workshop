/**
 * Phaser Real-Time Template
 * @author       Juan Nicholls <jdnichollsc@hotmail.com>
 * @copyright    2017 Proyecto 26 - https://github.com/proyecto26/Phaser-Workshop
 * @license      {@link http://opensource.org/licenses/MIT}
 * @version 1.0.0
 */

var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var Player = require('./socket/player')

io.on('connection', (socket) => {

  const player = new Player(socket)
})

server.listen(process.env.PORT || 8081, () => {
  console.log('Listening on '+server.address().port)
})