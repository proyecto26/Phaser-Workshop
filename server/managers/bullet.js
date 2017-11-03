const _ = require('lodash')

module.exports = class {
    constructor (socket, gameWorld) {
        this.socket = socket
        this.gameWorld = gameWorld
        socket.on('bullet.newBullet', this.newBullet.bind(this))
    }

    newBullet (){
        
    }
}