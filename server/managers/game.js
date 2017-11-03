module.exports = class {
    constructor (io, gameWorld) {
        this.io = io
        this.gameWorld = gameWorld
    }

    createGameInterval() {
        return setInterval(() => {
            this.io.emit('game.state', this.gameWorld)
        }, this.gameWorld.timeout || 1000/60)
    }

    /**
     * Get the data from the sockets (Other option)
     */
    getState () {
        let players = [], bullets = []
        for(var i = 0; i < io.sockets.connected.length; i++){
          var socket = io.sockets.connected[i]
          if(socket.player){
            players.push(socket.player)
            if(socket.bullets){
              bullets.concat(socket.bullets)
            }
          }
        }
        return { players, bullets }
    }
}