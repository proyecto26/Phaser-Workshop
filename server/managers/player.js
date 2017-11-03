const _ = require('lodash')

module.exports = class {
    constructor (socket, gameWorld) {
        this.socket = socket
        this.gameWorld = gameWorld
        this.currentPlayer = null
        socket.on('player.newPlayer', this.newPlayer.bind(this))
        socket.on('player.movement', this.movement.bind(this))
    }

    newPlayer (username) {
        this.currentPlayer = {
            id: this.socket.id,
            x: this.randomInt(100,400),
            y: 200,
            username: username
        }
        this.gameWorld.players.push(this.currentPlayer)
    
        // Create the player in the game
        this.socket.emit('player.created', {
            player: this.currentPlayer,
            enemies: this.getAllEnemies()
        })
        // Send the info of the new player to other gamers!
        this.socket.broadcast.emit('player.enemyCreated', this.currentPlayer)
    }

    deletePlayer (){
        _.remove(this.gameWorld.players, player => player.id === this.socket.id)
    }

    randomInt (low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    movement ({ x, y, legsAngle, legsFrame, torsoFrame }) {
        if(!this.currentPlayer) return
        this.currentPlayer.x = x
        this.currentPlayer.y = y
        this.currentPlayer.legsAngle = legsAngle
        this.currentPlayer.legsFrame = legsFrame
        this.currentPlayer.torsoFrame = torsoFrame
    }

    getAllEnemies () {
        return _.filter(this.gameWorld.players, player => player.id !== this.socket.id)
    }
}