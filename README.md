# Phaser-Workshop
A workshop to create beautiful games with **Phaser Framework**.

![Phaser Real-time games!](img/realtime-games.jpg)

## Preparation
- [Hello world, the Phaser basics!](http://slides.com/juandavidnicholls/phaser/)
- [Node.js basics](http://slides.com/juandavidnicholls/node-js#/)
- [Phaser Webpack template](https://github.com/lean/phaser-es6-webpack)

## Resources
- [How to make a multiplayer online game with Phaser, Socket.io and Node.js](http://www.dynetisgames.com/2017/03/06/how-to-make-a-multiplayer-online-game-with-phaser-socket-io-and-node-js/)
- [Multiplayer space-shooter game](https://github.com/code0wl/Multiplayer-Phaser-game)
- [Interest management for multiplayer online games](http://www.dynetisgames.com/2017/04/05/interest-management-mog/)
- [Fast-Paced Multiplayer](http://www.gabrielgambetta.com/client-server-game-architecture.html)

## Path Finding

## Isometric worlds

## Real-time games
- **Client prediction:**
  Inputs will be collected and sent to the server, and states (positions, frames, etc) can be updated while waiting for the messages to come back from the server.
- **Client interpolation**
  
- **Lag Compensation:**
  The clients simulate while the server rewinds the simulation and then sends out the confirmation message to the clients.

   #### Intructions to run the projects
   - **Client side:**
   ```
   cd basic/client
   npm start
   ```
   - **Server side:**
   ```
   cd basic/server
   npm start
   ```

## Credits
- **[Joe P](https://twitter.com/jmp909):** http://phaser.io/sandbox/UuTkxwqm/play
- **[Jerome Renaux](https://github.com/Jerenaux):** https://github.com/Jerenaux/basic-mmo-phaser
- **[Tom Van Schoor](https://github.com/TVScoundrel):** https://github.com/TVScoundrel/mmo-phaser-es6
