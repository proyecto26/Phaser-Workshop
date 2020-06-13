# Phaser CE Workshop using ES6
A workshop to create beautiful games with **Phaser Framework** 🎮 

Demo: https://proyecto26.com/phaser-real-time

![Phaser Real-time games!](img/realtime-games.jpg)

## Paht Finding and Isometric worls
`git clone -b isometric https://github.com/proyecto26/Phaser-Workshop.git`

*Demo: https://mmermerkaya.github.io/phaser-isometric-demo/*

## Basic client server interaction
`git clone -b client-server https://github.com/proyecto26/Phaser-Workshop.git`

*Demo: https://proyecto26.github.io/phaser-real-time/*

## Basic server update loop and client interaction
`git clone -b server-client https://github.com/proyecto26/Phaser-Workshop.git`

## Server client prediction
`SOON`

## Preparation
- [Hello world, the Phaser introduction!](http://slides.com/juandavidnicholls/phaser/)
- [Node.js basics](http://slides.com/juandavidnicholls/node-js#/)
- [Phaser Webpack template](https://github.com/lean/phaser-es6-webpack)

## Real-time games
- **Client prediction:**
  Inputs will be collected and sent to the server, and states (positions, frames, etc) can be updated while waiting for the messages to come back from the server.
  
- **Lag Compensation:**
  The clients simulate (Interpolation) while the server rewinds the simulation and then sends out the confirmation message to the clients.

## Intructions to run the projects
- **Client side:**
```
cd client
npm start
```
- **Server side:**
```
cd server
npm start
```
   
## Resources
- [How to make a multiplayer online game with Phaser, Socket.io and Node.js](http://www.dynetisgames.com/2017/03/06/how-to-make-a-multiplayer-online-game-with-phaser-socket-io-and-node-js/)
- [Multiplayer space-shooter game](https://github.com/code0wl/Multiplayer-Phaser-game)
- [Interest management for multiplayer online games](http://www.dynetisgames.com/2017/04/05/interest-management-mog/)
- [Fast-Paced Multiplayer](http://www.gabrielgambetta.com/client-server-game-architecture.html)

## Credits
- **[Joe P](https://twitter.com/jmp909):** http://phaser.io/sandbox/UuTkxwqm/play
- **[Mertcan Mermerkaya](https://github.com/mmermerkaya):** https://github.com/mmermerkaya/phaser-isometric-demo
- **[Jerome Renaux](https://github.com/Jerenaux):** https://github.com/Jerenaux/basic-mmo-phaser
- **[Tom Van Schoor](https://github.com/TVScoundrel):** https://github.com/TVScoundrel/mmo-phaser-es6
- **[Gabriel Gambetta](https://twitter.com/gabrielgambetta):** http://www.gabrielgambetta.com/client-server-game-architecture.html

## Happy coding 💯
Made with ❤️

<img width="150px" src="http://phaser.azurewebsites.net/assets/nicholls.png" align="right">
