export default class {
    constructor(game) {
        this.game = game
    }
    setName (player, name){
        let nameText = this.game.add.text(0, -50, name.substring(0, 6), {
            font: '16px Arial',
            fill: '#ffffff'
        });
        nameText.anchor.set(0.5, 0)
        player.addChild(nameText)
    }
}