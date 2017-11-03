const _ = require('lodash')

module.exports = class {
    constructor (socket) {
        this.socket = socket
        socket.on('player.newPlayer', this.newPlayer.bind(this))
        socket.on('player.movement', this.movement.bind(this))
    }

    newPlayer (username) {
        this.socket.player = {
            id: this.socket.id,
            x: this.randomInt(100,400),
            y: 200,
            username: username
        }
    
        // Create the player in the game
        this.socket.emit('player.created', {
            player: this.socket.player,
            enemies: this.getAllEnemies()
        })
        // Send the info of the new player to other gamers!
        this.socket.broadcast.emit('player.enemyCreated', this.socket.player)
    }

    randomInt (low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    movement ({ x, y, legsAngle, legsFrame, torsoFrame }) {
        if(!this.socket.player) return
        this.socket.player.x = x
        this.socket.player.y = y
        this.socket.player.legsAngle = legsAngle
        this.socket.player.legsFrame = legsFrame
        this.socket.player.torsoFrame = torsoFrame
        this.socket.broadcast.emit('enemy.position', this.socket.player)
    }

    getAllEnemies () {
        var sockets = this.socket.server.sockets.connected
        var enemies = _.map(_.pickBy(sockets, (socketEnemy, key) => {
            return !!socketEnemy.player && key != this.socket.id
        }), (socketEnemy) => socketEnemy.player)
        return enemies
    }
}